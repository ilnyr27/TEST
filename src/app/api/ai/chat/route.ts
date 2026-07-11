import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAIProvider } from "@/lib/ai/provider-factory";
import { buildChatMessages } from "@/lib/ai/prompt-builder";
import { ProviderType, AIMessage } from "@/lib/ai/types";
import { StoredResult } from "@/lib/test-engine/results-store";
import { checkRateLimit } from "@/lib/ai/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { allowed, retryAfterMs } = checkRateLimit(ip, 10, 60_000);
    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please wait." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
        }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Login required" }, { status: 401 });
    }

    const body = await request.json();
    const {
      message,
      chatHistory = [],
      provider = "deepseek",
      locale = "ru",
      criticismMode = false,
      results = [],
      sessionId,
      reportContext,
    } = body as {
      message: string;
      chatHistory: AIMessage[];
      provider: ProviderType;
      locale: "ru" | "en";
      criticismMode: boolean;
      results: StoredResult[];
      sessionId: string | null;
      reportContext?: string;
    };

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!sessionId) {
      return Response.json({ error: "No active session" }, { status: 400 });
    }

    // Validate session
    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id, messages_used, messages_limit, is_active")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (!session || !session.is_active) {
      return Response.json({ error: "Session not found or expired" }, { status: 404 });
    }

    if (session.messages_used >= session.messages_limit) {
      return Response.json(
        { error: "Session message limit reached" },
        { status: 402 }
      );
    }

    // Increment message count (fire-and-forget to not delay streaming)
    supabase
      .from("chat_sessions")
      .update({ messages_used: session.messages_used + 1 })
      .eq("id", sessionId)
      .then(() => {});

    const aiProvider = createAIProvider(provider);
    const messages = buildChatMessages(
      { locale, criticismMode, results, reportContext },
      chatHistory,
      message
    );

    const stream = await aiProvider.chat(messages);

    const encoder = new TextEncoder();
    const byteStream = stream.pipeThrough(
      new TransformStream<string, Uint8Array>({
        transform(chunk, controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
        },
        flush(controller) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        },
      })
    );

    return new Response(byteStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
