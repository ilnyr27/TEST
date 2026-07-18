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
import { DeepBigFiveScorer } from "./deep-big-five-scorer";
import { LocusScorer } from "./locus-scorer";
import { HardinessScorer } from "./hardiness-scorer";
import { CognitiveBiasScorer } from "./cognitive-bias-scorer";
import { ThinkingStyleScorer } from "./thinking-style-scorer";
import { ViaStrengthsScorer } from "./via-strengths-scorer";
import { WorkStyleScorer } from "./work-style-scorer";
import { EnergyManagementScorer } from "./energy-management-scorer";
import { TimeManagementScorer } from "./time-management-scorer";
import { ConflictStyleScorer } from "./conflict-style-scorer";
import { RelationshipValuesScorer } from "./relationship-values-scorer";
import { DivergentThinkingScorer } from "./divergent-thinking-scorer";
import { CreativityBlocksScorer } from "./creativity-blocks-scorer";

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
  "deep-big-five": new DeepBigFiveScorer(),
  "locus-control": new LocusScorer(),
  hardiness: new HardinessScorer(),
  "cognitive-bias": new CognitiveBiasScorer(),
  "thinking-style": new ThinkingStyleScorer(),
  "via-strengths": new ViaStrengthsScorer(),
  "work-style": new WorkStyleScorer(),
  "energy-management": new EnergyManagementScorer(),
  "time-management": new TimeManagementScorer(),
  "conflict-style": new ConflictStyleScorer(),
  "relationship-values": new RelationshipValuesScorer(),
  "divergent-thinking": new DivergentThinkingScorer(),
  "creativity-blocks": new CreativityBlocksScorer(),
};

export function getScorer(testSlug: string): Scorer | null {
  return scorers[testSlug] ?? null;
}
