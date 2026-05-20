export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProviderConfig {
  apiKey: string;
  model: string;
  baseURL?: string;
  maxTokens?: number;
}

export interface AIProvider {
  chat(messages: AIMessage[]): Promise<ReadableStream<string>>;
  analyze(messages: AIMessage[]): Promise<string>;
}

export type ProviderType = "claude" | "deepseek";
