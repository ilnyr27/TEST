import { AIMessage } from "./types";
import { StoredResult } from "@/lib/test-engine/results-store";

interface PromptContext {
  locale: "ru" | "en";
  criticismMode: boolean;
  results?: StoredResult[];
  testSlug?: string;
}

function buildSystemPrompt(ctx: PromptContext): string {
  const lang = ctx.locale === "ru" ? "Russian" : "English";

  const criticismBlock = ctx.criticismMode
    ? `
CRITICISM MODE: ON
You are a direct, no-nonsense psychological analyst. Do NOT sugarcoat.
If test results reveal contradictions between self-perception and behavioral indicators, state them plainly.
Use phrases like "Your data shows..." and "A significant blind spot is..."
Point out where the user may be deceiving themselves.
Be brutally honest but constructive. This is labeled "for the brave and honest" — the user has explicitly opted in.
Challenge assumptions. If scores suggest the person avoids difficult truths, say so directly.
`
    : `
CRITICISM MODE: OFF
You are a warm, encouraging psychological consultant. Frame all findings positively.
Weaknesses are "growth opportunities." Use phrases like "You have potential in..." and "An area worth developing is..."
Be supportive but honest. Acknowledge strengths first, then gently suggest areas for improvement.
`;

  let resultsBlock = "";
  if (ctx.results && ctx.results.length > 0) {
    resultsBlock = `\n\nUSER'S TEST RESULTS:\n`;
    for (const r of ctx.results) {
      resultsBlock += `\n[${r.testSlug.toUpperCase()}] (completed ${new Date(r.completedAt).toLocaleDateString()})\n`;
      resultsBlock += `Questions answered: ${r.answeredCount}/${r.totalQuestions}\n`;
      resultsBlock += `Time spent: ${Math.floor(r.timeSpentSeconds / 60)}min ${r.timeSpentSeconds % 60}s\n`;
      resultsBlock += `Summary: ${r.result.summary[ctx.locale]}\n`;
      resultsBlock += `Dimensions:\n`;
      for (const dim of r.result.dimensions) {
        if (dim.key !== "style") {
          resultsBlock += `  - ${dim.name}: ${dim.score}%\n`;
        } else {
          resultsBlock += `  - Type: ${dim.name}\n`;
        }
      }
    }
  }

  return `You are an experienced psychological consultant providing personalized analysis based on validated psychological test results.

LANGUAGE: Respond entirely in ${lang}.
${criticismBlock}
IMPORTANT GUIDELINES:
- Base all analysis on the provided test data, not speculation.
- Reference specific scores and dimensions when available.
- When you see contradictions between tests, note them.
- If you notice signs of burnout, anxiety, or depression in the scores, address them seriously and recommend professional help when appropriate.
- Do NOT diagnose. You are a consultant, not a clinician.
- Be concise but thorough. Use bullet points and structure for clarity.
- When the user asks a question, relate your answer to their test profile when relevant.
- If no test data is available, provide general psychological guidance and encourage taking tests for personalized insights.
${resultsBlock}`;
}

export function buildAnalysisMessages(ctx: PromptContext): AIMessage[] {
  const system = buildSystemPrompt(ctx);

  const userPrompt = ctx.locale === "ru"
    ? "Проанализируй мои результаты тестов. Дай полную картину моей личности на основе всех доступных данных. Укажи сильные стороны, зоны роста и конкретные рекомендации."
    : "Analyze my test results. Give a full picture of my personality based on all available data. Point out strengths, growth areas, and specific recommendations.";

  return [
    { role: "system", content: system },
    { role: "user", content: userPrompt },
  ];
}

export function buildChatMessages(
  ctx: PromptContext,
  chatHistory: AIMessage[],
  userMessage: string
): AIMessage[] {
  const system = buildSystemPrompt(ctx);

  return [
    { role: "system", content: system },
    ...chatHistory,
    { role: "user", content: userMessage },
  ];
}
