import { AIProvider, ProviderType } from "./types";
import { DeepSeekProvider } from "./deepseek-provider";

export function createAIProvider(type: ProviderType): AIProvider {
  switch (type) {
    case "deepseek": {
      const key = process.env.DEEPSEEK_API_KEY;
      if (!key) throw new Error("DEEPSEEK_API_KEY not set");
      return new DeepSeekProvider(key);
    }
    case "claude":
      throw new Error("Claude provider is temporarily unavailable");
    default:
      throw new Error(`Unknown AI provider: ${type}`);
  }
}
