"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "./useUser";

export function useCredits() {
  const { user } = useUser();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBalance(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("user_credits")
      .select("balance")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setBalance(data?.balance ?? 0);
        setLoading(false);
      });
  }, [user]);

  const refresh = async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("user_credits")
      .select("balance")
      .eq("user_id", user.id)
      .single();
    setBalance(data?.balance ?? 0);
  };

  return { balance, loading, refresh };
}
