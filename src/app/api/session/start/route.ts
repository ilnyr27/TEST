import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { FREE_MSG_LIMIT, UserPlan } from "@/lib/payment/plans";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Login required" }, { status: 401 });
  }

  const { provider } = (await request.json()) as { provider: "deepseek" | "claude" };

  const { data: plan } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", user.id)
    .single() as { data: UserPlan | null };

  // DeepSeek: check free session first (only if no paid sessions)
  if (provider === "deepseek") {
    const hasPaidSessions = (plan?.deepseek_sessions ?? 0) > 0;
    const freeUsed = plan?.free_session_used ?? false;

    if (!hasPaidSessions && !freeUsed) {
      // Use free session
      await supabase.from("user_plans").upsert({
        user_id: user.id,
        free_session_used: true,
        deepseek_sessions: 0,
        deepseek_msg_limit: FREE_MSG_LIMIT,
        claude_sessions: plan?.claude_sessions ?? 0,
        claude_msg_limit: plan?.claude_msg_limit ?? 0,
        has_report: plan?.has_report ?? false,
        free_analysis_used: plan?.free_analysis_used ?? false,
        updated_at: new Date().toISOString(),
      });

      const { data: session } = await supabase
        .from("chat_sessions")
        .insert({ user_id: user.id, provider: "free", messages_limit: FREE_MSG_LIMIT })
        .select()
        .single();

      return Response.json({
        sessionId: session!.id,
        messagesLimit: FREE_MSG_LIMIT,
        messagesUsed: 0,
        sessionsRemaining: null,
        isFree: true,
      });
    }

    if (!hasPaidSessions) {
      return Response.json(
        { error: "No DeepSeek sessions remaining" },
        { status: 402 }
      );
    }

    const remaining = plan!.deepseek_sessions;
    const msgLimit = plan!.deepseek_msg_limit;

    await supabase
      .from("user_plans")
      .update({ deepseek_sessions: remaining - 1, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    const { data: session } = await supabase
      .from("chat_sessions")
      .insert({ user_id: user.id, provider: "deepseek", messages_limit: msgLimit })
      .select()
      .single();

    return Response.json({
      sessionId: session!.id,
      messagesLimit: msgLimit,
      messagesUsed: 0,
      sessionsRemaining: remaining - 1,
      isFree: false,
    });
  }

  // Claude: always requires paid sessions
  const claudeRemaining = plan?.claude_sessions ?? 0;
  if (claudeRemaining < 1) {
    return Response.json(
      { error: "No Claude sessions remaining" },
      { status: 402 }
    );
  }

  const claudeMsgLimit = plan!.claude_msg_limit;

  await supabase
    .from("user_plans")
    .update({ claude_sessions: claudeRemaining - 1, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  const { data: session } = await supabase
    .from("chat_sessions")
    .insert({ user_id: user.id, provider: "claude", messages_limit: claudeMsgLimit })
    .select()
    .single();

  return Response.json({
    sessionId: session!.id,
    messagesLimit: claudeMsgLimit,
    messagesUsed: 0,
    sessionsRemaining: claudeRemaining - 1,
    isFree: false,
  });
}
