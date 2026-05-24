import { createClient } from "@/lib/supabase/client";
import { StoredResult } from "@/lib/test-engine/results-store";

// Cache: slug → UUID
const testIdCache = new Map<string, string>();

async function getTestIdBySlug(slug: string): Promise<string | null> {
  if (testIdCache.has(slug)) return testIdCache.get(slug)!;

  const supabase = createClient();
  const { data } = await supabase
    .from("tests")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (data?.id) {
    testIdCache.set(slug, data.id);
    return data.id;
  }
  return null;
}

/**
 * Save a single test result to Supabase.
 */
export async function saveResultToSupabase(data: StoredResult): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const testId = await getTestIdBySlug(data.testSlug);
  if (!testId) return; // Test not seeded in DB yet

  // Check if result already exists
  const { data: existing } = await supabase
    .from("test_results")
    .select("id")
    .eq("user_id", user.id)
    .eq("interpretation_key", data.testSlug)
    .maybeSingle();

  const scores = {
    dimensions: Object.fromEntries(
      data.result.dimensions.map((d) => [d.key, d.score])
    ),
  };
  const flags = data.result.flags || null;

  if (existing) {
    await supabase
      .from("test_results")
      .update({ scores, flags, calculated_at: data.completedAt })
      .eq("id", existing.id);
  } else {
    // Create a completed session first (FK requirement)
    const { data: session } = await supabase
      .from("test_sessions")
      .insert({
        user_id: user.id,
        test_id: testId,
        status: "completed",
        answers_count: data.answeredCount,
        time_spent_seconds: data.timeSpentSeconds,
        completed_at: data.completedAt,
      })
      .select("id")
      .single();

    if (!session) return;

    await supabase.from("test_results").insert({
      session_id: session.id,
      user_id: user.id,
      test_id: testId,
      scores,
      interpretation_key: data.testSlug,
      flags,
      calculated_at: data.completedAt,
    });
  }
}

/**
 * Load results from Supabase, returning them as StoredResult[] for compatibility.
 */
export async function getResultsFromSupabase(): Promise<StoredResult[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: results } = await supabase
    .from("test_results")
    .select("*, test_sessions(answers_count, time_spent_seconds)")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false });

  if (!results) return [];

  return results.map((r) => {
    const dims = (r.scores as Record<string, unknown>)?.dimensions as
      | Record<string, number>
      | undefined;
    const session = r.test_sessions as {
      answers_count: number;
      time_spent_seconds: number;
    } | null;

    return {
      testSlug: r.interpretation_key || "",
      result: {
        testSlug: r.interpretation_key || "",
        dimensions: Object.entries(dims || {}).map(([key, score]) => ({
          key,
          name: key,
          score,
          description: "",
          color: "#888",
        })),
        radarData: Object.entries(dims || {}).map(([name, value]) => ({
          name,
          value,
          fullMark: 100,
        })),
        summary: { ru: "", en: "" },
        flags: (r.flags as Record<string, boolean>) || undefined,
      },
      completedAt: r.calculated_at,
      answeredCount: session?.answers_count || 0,
      totalQuestions: 0,
      timeSpentSeconds: session?.time_spent_seconds || 0,
    };
  });
}

/**
 * Sync localStorage results → Supabase on login.
 * Only adds results not already in Supabase.
 */
export async function syncResultsOnLogin(
  localResults: StoredResult[]
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || localResults.length === 0) return;

  const { data: existing } = await supabase
    .from("test_results")
    .select("interpretation_key")
    .eq("user_id", user.id);

  const existingSlugs = new Set(
    (existing || []).map((r) => r.interpretation_key)
  );

  for (const result of localResults) {
    if (!existingSlugs.has(result.testSlug)) {
      await saveResultToSupabase(result);
    }
  }
}
