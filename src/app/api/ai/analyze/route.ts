import { NextRequest } from "next/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { buildAnalysisMessages } from "@/lib/ai/prompt-builder";
import { ProviderType } from "@/lib/ai/types";
import { StoredResult } from "@/lib/test-engine/results-store";

export async function POST(request: NextRequest) {
  try {
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
