import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { buildAnalysisMessages } from "@/lib/ai/prompt-builder";
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

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json(
        { error: "Login required to use AI analysis" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      locale = "ru",
      criticismMode = false,
      results = [],
    } = body as {
      locale: "ru" | "en";
      criticismMode: boolean;
      results: StoredResult[];
    };

    if (results.length === 0) {
      return Response.json({ error: "No test results provided" }, { status: 400 });
    }

    // Check free analysis gate
    const { data: plan } = await supabase
      .from("user_plans")
      .select("free_analysis_used, deepseek_sessions, claude_sessions, has_report, free_session_used, deepseek_msg_limit, claude_msg_limit")
      .eq("user_id", user.id)
      .single();

    const hasPaidPlan =
      (plan?.deepseek_sessions ?? 0) > 0 ||
      (plan?.claude_sessions ?? 0) > 0 ||
      (plan?.has_report ?? false);
    const freeUsed = plan?.free_analysis_used ?? false;

    if (!hasPaidPlan && freeUsed) {
      return Response.json(
        { error: "Free analysis used. Purchase a plan to continue." },
        { status: 402 }
      );
    }

    // Mark free analysis as used (only for free-tier users)
    if (!hasPaidPlan && !freeUsed) {
      await supabase.from("user_plans").upsert({
        user_id: user.id,
        free_analysis_used: true,
        deepseek_sessions: plan?.deepseek_sessions ?? 0,
        deepseek_msg_limit: plan?.deepseek_msg_limit ?? 20,
        claude_sessions: plan?.claude_sessions ?? 0,
        claude_msg_limit: plan?.claude_msg_limit ?? 0,
        has_report: plan?.has_report ?? false,
        free_session_used: plan?.free_session_used ?? false,
        updated_at: new Date().toISOString(),
      });
    }

    // Always DeepSeek for test analysis (Claude analysis — coming soon)
    const aiProvider = createAIProvider("deepseek");
    const messages = buildAnalysisMessages({ locale, criticismMode, results });
    const analysis = await aiProvider.analyze(messages);

    return Response.json({ analysis });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
