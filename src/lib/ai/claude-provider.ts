import { AIProvider, AIMessage } from "./types";

const CLAUDE_BASE_URL = "https://api.anthropic.com";

export class ClaudeProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = "claude-sonnet-4-20250514") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async chat(messages: AIMessage[]): Promise<ReadableStream<string>> {
    const systemMsg = messages.find((m) => m.role === "system")?.content ?? "";
    const nonSystemMessages = messages.filter((m) => m.role !== "system");

    const response = await fetch(`${CLAUDE_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1500,
        system: systemMsg,
        messages: nonSystemMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error: ${response.status} ${err}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    return new ReadableStream<string>({
      async pull(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const json = JSON.parse(line.slice(6));
                if (json.type === "content_block_delta") {
                  const text = json.delta?.text;
                  if (text) controller.enqueue(text);
                }
                if (json.type === "message_stop") {
                  controller.close();
                  return;
                }
              } catch {
                // skip
              }
            }
          }
        }
      },
    });
  }

  async analyze(messages: AIMessage[]): Promise<string> {
    const systemMsg = messages.find((m) => m.role === "system")?.content ?? "";
    const nonSystemMessages = messages.filter((m) => m.role !== "system");

    const response = await fetch(`${CLAUDE_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2000,
        system: systemMsg,
        messages: nonSystemMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error: ${response.status} ${err}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text ?? "";
  }
}
