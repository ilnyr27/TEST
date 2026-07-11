import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { StoredResult } from "@/lib/test-engine/results-store";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { allowed, retryAfterMs } = checkRateLimit(ip, 5, 60_000);
    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please wait." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Login required" }, { status: 401 });

    const body = await request.json();
    const { locale = "ru", results = [] } = body as {
      locale: "ru" | "en";
      results: StoredResult[];
    };

    if (results.length === 0) {
      return Response.json({ error: "No test results provided" }, { status: 400 });
    }

    const ru = locale === "ru";
    const testSummaries = results
      .map((r) => {
        const dims = r.result.dimensions.map((d) => `${d.name}: ${d.score}%`).join(", ");
        const summary = ru ? r.result.summary.ru : r.result.summary.en;
        return `Тест: ${r.testSlug}\nРезультат: ${summary}\nПоказатели: ${dims}`;
      })
      .join("\n\n---\n\n");

    const systemPrompt = ru
      ? `Ты опытный психолог. На основе результатов психологических тестов напиши раздел "Общий портрет" личности.
Напиши 3–4 абзаца: кто этот человек, его ключевые черты характера, мотивация, внутренний мир.
Пиши тепло, глубоко и конкретно — опирайся на конкретные показатели тестов.
Не пиши заголовок и не нумеруй разделы — только текст.`
      : `You are an experienced psychologist. Based on psychological test results, write a "General Portrait" section.
Write 3–4 paragraphs: who this person is, their key personality traits, motivation, inner world.
Write warmly, deeply and specifically — refer to the actual test scores.
Do not include a heading or section numbers — just the text.`;

    const userMessage = ru
      ? `Результаты тестов:\n\n${testSummaries}\n\nНапиши раздел "Общий портрет".`
      : `Test results:\n\n${testSummaries}\n\nWrite the "General Portrait" section.`;

    const aiProvider = createAIProvider("deepseek");
    const preview = await aiProvider.analyze([
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ]);

    return Response.json({ preview });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
