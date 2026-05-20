import { Scorer } from "./types";
import { BigFiveScorer } from "./big-five-scorer";
import { RIASECScorer } from "./riasec-scorer";
import { AttachmentScorer } from "./attachment-scorer";

const scorers: Record<string, Scorer> = {
  "big-five": new BigFiveScorer(),
  riasec: new RIASECScorer(),
  "attachment-style": new AttachmentScorer(),
};

export function getScorer(testSlug: string): Scorer | null {
  return scorers[testSlug] ?? null;
}
