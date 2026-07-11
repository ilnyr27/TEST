import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { StoredResult } from "@/lib/test-engine/results-store";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { allowed, retryAfterMs } = checkRateLimit(ip, 3, 60_000);
    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please wait." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Login required" }, { status: 401 });
    }

    // Check access: user must have has_report = true
    const { data: plan } = await supabase
      .from("user_plans")
      .select("has_report")
      .eq("user_id", user.id)
      .single();

    if (!plan?.has_report) {
      return Response.json({ error: "Full report not included in your plan" }, { status: 402 });
    }

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
        const dims = r.result.dimensions
          .map((d) => `${d.name}: ${d.score}%`)
          .join(", ");
        const summary = ru ? r.result.summary.ru : r.result.summary.en;
        return `Тест: ${r.testSlug}\nРезультат: ${summary}\nПоказатели: ${dims}`;
      })
      .join("\n\n---\n\n");

    const systemPrompt = ru
      ? `Ты опытный психолог и коуч. На основе результатов психологических тестов составь полный, глубокий отчёт о личности человека.

Используй СТРОГО эти заголовки разделов (## уровень):

## Общий портрет
Кто этот человек, ключевые черты характера, внутренний мир, мотивация.

## Сильные стороны
Что развито хорошо, уникальные способности, ресурсы личности.

## Зоны роста
Что можно и стоит развить, конкретные ограничения и как с ними работать.

## Взаимосвязи черт личности
Как разные черты влияют друг на друга, синергии и противоречия.

## Карьера и призвание
Подходящие сферы деятельности, стиль работы, роли в команде.

## Отношения и коммуникация
Стиль общения, потребности в отношениях, типичные паттерны.

## Эмоциональный интеллект
Самосознание, управление эмоциями, эмпатия, социальные навыки.

## Практические рекомендации
Конкретные шаги для развития — минимум 5 пунктов списком.

Пиши тепло, честно и конструктивно. Опирайся на конкретные показатели тестов.`
      : `You are an experienced psychologist and coach. Based on psychological test results, create a complete, deep personality report.

Use EXACTLY these section headers (## level):

## General Portrait
Who this person is, key personality traits, inner world, motivation.

## Strengths
What is well developed, unique abilities, personal resources.

## Growth Areas
What can and should be developed, specific limitations and how to work with them.

## Personality Trait Connections
How different traits influence each other, synergies and contradictions.

## Career & Purpose
Suitable fields, work style, team roles.

## Relationships & Communication
Communication style, relationship needs, typical patterns.

## Emotional Intelligence
Self-awareness, emotion management, empathy, social skills.

## Practical Recommendations
Concrete development steps — at least 5 bullet points.

Write warmly, honestly, and constructively. Reference specific test scores.`;

    const userMessage = ru
      ? `Результаты тестов:\n\n${testSummaries}\n\nСоставь полный психологический отчёт по всем 8 разделам.`
      : `Test results:\n\n${testSummaries}\n\nCreate a comprehensive psychological report across all 8 sections.`;

    const aiProvider = createAIProvider("deepseek");
    const report = await aiProvider.analyze([
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ]);

    return Response.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
