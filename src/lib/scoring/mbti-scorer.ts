import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { mbtiDimensions } from "@/lib/test-engine/mbti-data";

const DIMS = ["EI", "SN", "TF", "JP"] as const;

/** Maps each dimension to its two poles and the total number of questions */
const dimConfig: Record<string, { poleA: string; poleB: string; total: number }> = {
  EI: { poleA: "E", poleB: "I", total: 8 },
  SN: { poleA: "S", poleB: "N", total: 8 },
  TF: { poleA: "T", poleB: "F", total: 7 },
  JP: { poleA: "J", poleB: "P", total: 7 },
};

/** Brief descriptions for all 16 types — bilingual */
const typeDescriptions: Record<string, { ru: string; en: string }> = {
  ISTJ: {
    ru: "Ответственный реалист — надёжный, организованный и верный долгу",
    en: "Responsible Realist — dependable, organized, and duty-bound",
  },
  ISFJ: {
    ru: "Заботливый защитник — тёплый, внимательный и преданный близким",
    en: "Caring Protector — warm, attentive, and devoted to loved ones",
  },
  INFJ: {
    ru: "Проницательный наставник — идеалист с глубоким пониманием людей",
    en: "Insightful Mentor — an idealist with deep understanding of people",
  },
  INTJ: {
    ru: "Стратегический визионер — независимый мыслитель с чётким планом",
    en: "Strategic Visionary — an independent thinker with a clear plan",
  },
  ISTP: {
    ru: "Виртуозный мастер — спокойный аналитик, любящий разбирать всё на части",
    en: "Virtuoso Craftsman — a calm analyst who loves taking things apart",
  },
  ISFP: {
    ru: "Чуткий искатель — тихий художник, живущий в гармонии с собой",
    en: "Gentle Explorer — a quiet artist living in harmony with themselves",
  },
  INFP: {
    ru: "Мечтательный идеалист — творческая душа, ведомая ценностями",
    en: "Dreamy Idealist — a creative soul guided by values",
  },
  INTP: {
    ru: "Архитектор идей — любопытный мыслитель, живущий в мире концепций",
    en: "Architect of Ideas — a curious thinker living in a world of concepts",
  },
  ESTP: {
    ru: "Энергичный прагматик — смелый, быстрый и любящий риск",
    en: "Energetic Pragmatist — bold, quick, and risk-loving",
  },
  ESFP: {
    ru: "Искромётный артист — весёлый, щедрый и обожающий жизнь",
    en: "Sparkling Performer — fun, generous, and in love with life",
  },
  ENFP: {
    ru: "Вдохновлённый энтузиаст — креативный, тёплый и полный идей",
    en: "Inspired Enthusiast — creative, warm, and full of ideas",
  },
  ENTP: {
    ru: "Находчивый изобретатель — остроумный спорщик, видящий возможности везде",
    en: "Resourceful Inventor — a witty debater who sees possibilities everywhere",
  },
  ESTJ: {
    ru: "Решительный организатор — прямолинейный лидер, ценящий порядок",
    en: "Decisive Organizer — a straightforward leader who values order",
  },
  ESFJ: {
    ru: "Гостеприимный хранитель — заботливый, общительный и командный игрок",
    en: "Warm Host — caring, sociable, and a team player",
  },
  ENFJ: {
    ru: "Харизматичный наставник — вдохновляющий лидер, помогающий другим расти",
    en: "Charismatic Mentor — an inspiring leader who helps others grow",
  },
  ENTJ: {
    ru: "Командир-стратег — уверенный лидер с масштабным мышлением",
    en: "Commander-Strategist — a confident leader with big-picture thinking",
  },
};

export class MBTIScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; choice_scores?: { a: string; b: string } } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    // Count pole selections per dimension
    const poleCounts: Record<string, Record<string, number>> = {};
    for (const dim of DIMS) {
      const cfg = dimConfig[dim];
      poleCounts[dim] = { [cfg.poleA]: 0, [cfg.poleB]: 0 };
    }

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.selected || !q.scoring_key?.choice_scores) continue;
      const dim = q.scoring_key.dimension;
      const choiceScores = q.scoring_key.choice_scores as { a: string; b: string };
      const pole = choiceScores[ans.selected as "a" | "b"];
      if (pole && poleCounts[dim]) {
        poleCounts[dim][pole] = (poleCounts[dim][pole] || 0) + 1;
      }
    }

    // Determine dominant pole and percentage for each dimension
    const typeLetters: string[] = [];
    const dimensions: { key: string; name: string; score: number; description: string; color: string }[] = DIMS.map((dim) => {
      const cfg = dimConfig[dim];
      const meta = mbtiDimensions[dim];
      const countA = poleCounts[dim][cfg.poleA] || 0;
      const countB = poleCounts[dim][cfg.poleB] || 0;
      const total = countA + countB || cfg.total;

      const dominantIsA = countA >= countB;
      const dominant = dominantIsA ? cfg.poleA : cfg.poleB;
      const dominantCount = dominantIsA ? countA : countB;
      const percentage = Math.round((dominantCount / total) * 100);

      typeLetters.push(dominant);

      const poleInfo = dominantIsA ? meta.poleA : meta.poleB;
      return {
        key: dim,
        name: locale === "ru" ? poleInfo.nameRu : poleInfo.nameEn,
        score: percentage,
        description: locale === "ru" ? poleInfo.descRu : poleInfo.descEn,
        color: meta.color,
      };
    });

    const typeCode = typeLetters.join("");
    const typeDesc = typeDescriptions[typeCode] || { ru: typeCode, en: typeCode };

    // Add "style" dimension with 4-letter type code
    dimensions.push({
      key: "style",
      name: typeCode,
      score: 0,
      description: locale === "ru" ? typeDesc.ru : typeDesc.en,
      color: "#6366f1",
    });

    return {
      testSlug: "mbti-light",
      dimensions,
      radarData: dimensions
        .filter((d) => d.key !== "style")
        .map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: `Ваш тип личности — ${typeCode}: ${typeDesc.ru}.`,
        en: `Your personality type is ${typeCode} — ${typeDesc.en}.`,
      },
    };
  }
}
