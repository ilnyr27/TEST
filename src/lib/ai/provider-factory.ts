import { AIProvider, ProviderType } from "./types";
import { DeepSeekProvider } from "./deepseek-provider";
import { ClaudeProvider } from "./claude-provider";

export function createAIProvider(type: ProviderType): AIProvider {
  switch (type) {
    case "deepseek": {
      const key = process.env.DEEPSEEK_API_KEY;
      if (!key) throw new Error("DEEPSEEK_API_KEY not set");
      return new DeepSeekProvider(key);
    }
    case "claude": {
      const key = process.env.CLAUDE_API_KEY;
      if (!key || key === "your_claude_api_key_here") {
        throw new Error("CLAUDE_API_KEY not set");
      }
      return new ClaudeProvider(key);
    }
    default:
      throw new Error(`Unknown AI provider: ${type}`);
  }
}
