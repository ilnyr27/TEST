"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const syncedRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (user && !syncedRef.current) {
        syncedRef.current = true;
        // Lazy import to avoid circular deps and keep bundle small
        import("@/lib/supabase/sync-service").then((m) =>
          m.syncOnLogin().catch(() => {})
        );
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN" && session?.user && !syncedRef.current) {
        syncedRef.current = true;
        import("@/lib/supabase/sync-service").then((m) =>
          m.syncOnLogin().catch(() => {})
        );
      }
      if (event === "SIGNED_OUT") {
        syncedRef.current = false;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
