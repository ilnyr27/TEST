import { ScoringResult } from "@/lib/scoring/types";

const STORAGE_KEY = "know-yourself-results";

export interface StoredResult {
  testSlug: string;
  result: ScoringResult;
  completedAt: string;
  answeredCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
}

export function saveResult(data: StoredResult): void {
  if (typeof window === "undefined") return;
  const existing = getResults();
  // Replace if same test, or add new
  const idx = existing.findIndex((r) => r.testSlug === data.testSlug);
  if (idx >= 0) {
    existing[idx] = data;
  } else {
    existing.push(data);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getResults(): StoredResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getResultBySlug(slug: string): StoredResult | null {
  return getResults().find((r) => r.testSlug === slug) ?? null;
}

export function clearResults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
