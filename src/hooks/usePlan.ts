"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "./useUser";
import { UserPlan } from "@/lib/payment/plans";

export function usePlan() {
  const { user } = useUser();
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPlan(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const supabase = createClient();
    supabase
      .from("user_plans")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setPlan(data as UserPlan | null);
        setLoading(false);
      });
  }, [user]);

  const refresh = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("user_plans")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setPlan(data as UserPlan | null);
  }, [user]);

  return {
    plan,
    loading,
    refresh,
    deepseekSessions: plan?.deepseek_sessions ?? 0,
    deepseekMsgLimit: plan?.deepseek_msg_limit ?? 20,
    claudeSessions: plan?.claude_sessions ?? 0,
    claudeMsgLimit: plan?.claude_msg_limit ?? 0,
    hasReport: plan?.has_report ?? false,
    freeSessionUsed: plan?.free_session_used ?? false,
    freeAnalysisUsed: plan?.free_analysis_used ?? false,
  };
}
