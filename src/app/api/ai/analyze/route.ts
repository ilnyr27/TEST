import { NextRequest } from "next/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { buildAnalysisMessages } from "@/lib/ai/prompt-builder";
import { ProviderType } from "@/lib/ai/types";
import { StoredResult } from "@/lib/test-engine/results-store";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { allowed, retryAfterMs } = checkRateLimit(ip, 5, 60_000);
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
      provider = "deepseek",
      locale = "ru",
      criticismMode = false,
      results = [],
    } = body as {
      provider: ProviderType;
      locale: "ru" | "en";
      criticismMode: boolean;
      results: StoredResult[];
    };

    if (results.length === 0) {
      return Response.json(
        { error: "No test results provided" },
        { status: 400 }
      );
    }

    const aiProvider = createAIProvider(provider);
    const messages = buildAnalysisMessages({ locale, criticismMode, results });
    const analysis = await aiProvider.analyze(messages);

    return Response.json({ analysis });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
