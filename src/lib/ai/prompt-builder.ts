import { AIMessage } from "./types";
import { StoredResult } from "@/lib/test-engine/results-store";

interface PromptContext {
  locale: "ru" | "en";
  criticismMode: boolean;
  results?: StoredResult[];
  testSlug?: string;
  reportContext?: string;
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

  let reportBlock = "";
  if (ctx.reportContext) {
    const label = ctx.locale === "ru"
      ? "ПОЛНЫЙ ПСИХОЛОГИЧЕСКИЙ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ (составлен ранее)"
      : "USER'S FULL PSYCHOLOGICAL PROFILE (previously generated)";
    const note = ctx.locale === "ru"
      ? "Это детальный анализ личности этого конкретного пользователя. Используй его как основной контекст. Ссылайся на конкретные разделы (сильные стороны, карьера, отношения и т.д.) в ответах."
      : "This is a detailed personality analysis for this specific user. Use it as primary context. Reference specific sections (strengths, career, relationships, etc.) in your responses.";
    reportBlock = `\n\n${label}:\n${note}\n---\n${ctx.reportContext}\n---`;
  }

  return `You are an experienced psychological consultant providing personalized coaching based on validated psychological test results.

LANGUAGE: Respond entirely in ${lang}.
${criticismBlock}
DIALOGUE RULES (CRITICAL — follow these strictly):
- This is a COACHING CONVERSATION, not a report. Respond conversationally, 2-4 short paragraphs max per message.
- NEVER dump a full analysis of all tests in one message, even if you have all the data. That is what the Full Report is for.
- Start by understanding what the user wants to explore TODAY. Ask one focused question to guide the conversation.
- Reveal insights gradually as the conversation unfolds — let the user's questions drive depth.
- If the user asks a broad opening ("tell me about myself"), pick ONE most interesting insight from their data and ask a follow-up question instead of listing everything.
- You may reference specific test scores when directly relevant to what the user is discussing.
- If no test data is available, provide general psychological guidance and encourage taking tests for personalized insights.

CONTENT GUIDELINES:
- Base all analysis on the provided test data, not speculation.
- If you notice signs of burnout, anxiety, or depression in the scores, address them seriously and recommend professional help when appropriate.
- Do NOT diagnose. You are a consultant, not a clinician.
- When the user asks a question, relate your answer to their test profile when relevant.
${resultsBlock}${reportBlock}`;
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

export function buildSingleTestAnalysisMessages(
  result: StoredResult,
  locale: "ru" | "en"
): AIMessage[] {
  const lang = locale === "ru" ? "Russian" : "English";

  let testBlock = `TEST: ${result.testSlug.toUpperCase()} (completed ${new Date(result.completedAt).toLocaleDateString()})\n`;
  testBlock += `Summary: ${result.result.summary[locale]}\n`;
  testBlock += `Dimensions:\n`;
  for (const dim of result.result.dimensions) {
    if (dim.key !== "style") {
      testBlock += `  - ${dim.name}: ${dim.score}%\n`;
    } else {
      testBlock += `  - Type: ${dim.name}\n`;
    }
  }

  const system = `You are a psychological consultant giving a brief interpretation of ONE test result.

LANGUAGE: Respond entirely in ${lang}.

STRICT RULES:
- Analyze ONLY this one test. Do NOT mention other tests or give a general personality profile.
- Length: exactly 2-3 paragraphs of plain text. No headers, no bullet lists, no emojis.
- Cover: what the result reveals about the person, 1-2 notable strengths, and one concrete thing to be aware of.
- Do NOT give career advice, relationship advice, or life recommendations — those are for a full report.

${testBlock}`;

  const userPrompt = locale === "ru"
    ? "Дай краткую интерпретацию моего результата."
    : "Give me a brief interpretation of my result.";

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
