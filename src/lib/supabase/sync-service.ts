import { getResults } from "@/lib/test-engine/results-store";
import { syncResultsOnLogin } from "./results-sync";

/**
 * Called once on login — migrates localStorage data to Supabase.
 * Runs in the background (non-blocking).
 */
export async function syncOnLogin(): Promise<void> {
  try {
    // Sync test results
    const localResults = getResults();
    if (localResults.length > 0) {
      await syncResultsOnLogin(localResults);
    }
  } catch (error) {
    console.error("[sync] Failed to sync on login:", error);
  }
}
