import { Scorer } from "./types";
import { BigFiveScorer } from "./big-five-scorer";
import { RIASECScorer } from "./riasec-scorer";
import { AttachmentScorer } from "./attachment-scorer";
import { EQScorer } from "./eq-scorer";
import { BurnoutScorer } from "./burnout-scorer";
import { CareerValuesScorer } from "./career-values-scorer";
import { GardnerScorer } from "./gardner-scorer";
import { CreativeScorer } from "./creative-scorer";
import { HabitsScorer } from "./habits-scorer";
import { MBTIScorer } from "./mbti-scorer";
import { LoveLanguagesScorer } from "./love-languages-scorer";
import { CareerAptitudeScorer } from "./career-aptitude-scorer";
import { ShadowScorer } from "./shadow-scorer";

const scorers: Record<string, Scorer> = {
  "big-five": new BigFiveScorer(),
  riasec: new RIASECScorer(),
  "attachment-style": new AttachmentScorer(),
  eq: new EQScorer(),
  burnout: new BurnoutScorer(),
  "career-values": new CareerValuesScorer(),
  gardner: new GardnerScorer(),
  creative: new CreativeScorer(),
  habits: new HabitsScorer(),
  "mbti-light": new MBTIScorer(),
  "love-languages": new LoveLanguagesScorer(),
  "career-aptitude": new CareerAptitudeScorer(),
  shadow: new ShadowScorer(),
};

export function getScorer(testSlug: string): Scorer | null {
  return scorers[testSlug] ?? null;
}
