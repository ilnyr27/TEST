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
      ? `Ты опытный психолог и коуч. Ты получаешь результаты нескольких психологических тестов одного человека. Твоя задача — составить полный, глубокий и практичный отчёт о личности этого человека.

Структура отчёта:
1. **Общий портрет** — кто этот человек, его ключевые черты
2. **Сильные стороны** — что у него хорошо развито
3. **Зоны роста** — что можно развить
4. **Взаимосвязи** — как разные черты влияют друг на друга
5. **Практические рекомендации** — конкретные шаги для развития

Пиши тепло, честно и конструктивно. Используй markdown для форматирования.`
      : `You are an experienced psychologist and coach. You receive results from multiple psychological tests of one person. Your task is to create a complete, deep, and practical personality report.

Report structure:
1. **Overall Portrait** — who this person is, their key traits
2. **Strengths** — what is well developed
3. **Growth Areas** — what can be improved
4. **Connections** — how different traits interact
5. **Practical Recommendations** — concrete steps for development

Write warmly, honestly, and constructively. Use markdown for formatting.`;

    const userMessage = ru
      ? `Вот результаты тестов:\n\n${testSummaries}\n\nСоставь полный психологический отчёт.`
      : `Here are the test results:\n\n${testSummaries}\n\nCreate a comprehensive psychological report.`;

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
