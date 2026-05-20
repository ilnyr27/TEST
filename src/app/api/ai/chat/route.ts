import { NextRequest } from "next/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { buildChatMessages } from "@/lib/ai/prompt-builder";
import { ProviderType, AIMessage } from "@/lib/ai/types";
import { StoredResult } from "@/lib/test-engine/results-store";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { allowed, retryAfterMs } = checkRateLimit(ip, 10, 60_000);
    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please wait." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
        }
      );
    }
    const body = await request.json();
    const {
      message,
      chatHistory = [],
      provider = "deepseek",
      locale = "ru",
      criticismMode = false,
      results = [],
    } = body as {
      message: string;
      chatHistory: AIMessage[];
      provider: ProviderType;
      locale: "ru" | "en";
      criticismMode: boolean;
      results: StoredResult[];
    };

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const aiProvider = createAIProvider(provider);
    const messages = buildChatMessages(
      { locale, criticismMode, results },
      chatHistory,
      message
    );

    const stream = await aiProvider.chat(messages);

    // Convert string stream to byte stream for Response
    const encoder = new TextEncoder();
    const byteStream = stream.pipeThrough(
      new TransformStream<string, Uint8Array>({
        transform(chunk, controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
        },
        flush(controller) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        },
      })
    );

    return new Response(byteStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
