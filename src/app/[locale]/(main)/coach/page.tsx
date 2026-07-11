"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Bot,
  Send,
  Shield,
  User,
  Loader2,
  Plus,
  ArrowRight,
  AlertTriangle,
  History,
  Trash2,
  Crown,
} from "lucide-react";
import { getResults } from "@/lib/test-engine/results-store";
import { AIMessage } from "@/lib/ai/types";
import { Link } from "@/lib/i18n/navigation";
import { useUser } from "@/hooks/useUser";
import { usePlan } from "@/hooks/usePlan";
import { createClient } from "@/lib/supabase/client";
import { MarkdownText } from "@/components/ui/markdown-text";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SessionState {
  id: string;
  messagesUsed: number;
  messagesLimit: number;
}

interface SavedConversation {
  id: string;
  provider: "deepseek" | "claude";
  title: string;
  messages: ChatMessage[];
  session: SessionState | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const HISTORY_KEY = "coach-history";
const ACTIVE_KEY = "coach-active-id";

function loadHistory(): SavedConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistHistory(history: SavedConversation[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function upsertInHistory(
  history: SavedConversation[],
  conv: SavedConversation
): SavedConversation[] {
  const idx = history.findIndex((c) => c.id === conv.id);
  if (idx >= 0) {
    const copy = [...history];
    copy[idx] = conv;
    return copy;
  }
  return [conv, ...history];
}

function fmtDate(dateStr: string, ru: boolean): string {
  const date = new Date(dateStr);
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (diffDays === 0) return ru ? "Сегодня" : "Today";
  if (diffDays === 1) return ru ? "Вчера" : "Yesterday";
  if (diffDays < 7) return ru ? `${diffDays} дн. назад` : `${diffDays}d ago`;
  return date.toLocaleDateString(ru ? "ru-RU" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

// Migrate old single-conversation format to history array
function migrateOldFormat(): void {
  for (const prov of ["deepseek", "claude"] as const) {
    const oldChat = localStorage.getItem(`coach-chat-${prov}`);
    if (!oldChat) continue;
    try {
      const msgs: ChatMessage[] = JSON.parse(oldChat);
      if (msgs.length > 0) {
        const history = loadHistory();
        const conv: SavedConversation = {
          id: crypto.randomUUID(),
          provider: prov,
          title:
            msgs.find((m) => m.role === "user")?.content.slice(0, 45) ?? "Chat",
          messages: msgs,
          session: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        persistHistory(upsertInHistory(history, conv));
      }
    } catch {
      /* ignore */
    }
    localStorage.removeItem(`coach-chat-${prov}`);
    localStorage.removeItem(`coach-session-${prov}`);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachPage() {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("ai");
  const { user } = useUser();
  const { hasReport } = usePlan();
  const ru = locale === "ru";

  const [reportContext, setReportContext] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [criticismMode, setCriticismMode] = useState(false);
  const [provider, setProvider] = useState<"deepseek" | "claude">("deepseek");
  const [error, setError] = useState<string | null>(null);

  const [session, setSession] = useState<SessionState | null>(null);
  const [sessionsRemaining, setSessionsRemaining] = useState<number | null>(null);
  const [sessionError, setSessionError] = useState<"no_auth" | "no_sessions" | null>(null);

  const [activeConvId, setActiveConvId] = useState<string>("");
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initRef = useRef(false);

  // Mutable snapshot of latest state — avoids stale closures in callbacks
  const snap = useRef({ messages, session, provider, activeConvId });
  useEffect(() => {
    snap.current = { messages, session, provider, activeConvId };
  }, [messages, session, provider, activeConvId]);

  // ── Init on mount ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    migrateOldFormat();
    const history = loadHistory();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConversations(history);

    const lastId = localStorage.getItem(ACTIVE_KEY);
    if (lastId) {
      const conv = history.find((c) => c.id === lastId);
      if (conv) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveConvId(conv.id);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProvider(conv.provider);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(conv.messages);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSession(conv.session);
        return;
      }
    }

    const newId = crypto.randomUUID();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveConvId(newId);
    localStorage.setItem(ACTIVE_KEY, newId);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load full report for personalized coaching context
  useEffect(() => {
    if (!user || !hasReport) return;
    createClient()
      .from("user_reports")
      .select("content")
      .eq("user_id", user.id)
      .eq("locale", locale)
      .single()
      .then(({ data }) => {
        if (data?.content) setReportContext(data.content);
      });
  }, [user, hasReport, locale]);

  // ── Save helper ──────────────────────────────────────────────────────────────

  const saveConv = useCallback(
    (
      msgs: ChatMessage[],
      sess: SessionState | null,
      convId: string,
      prov: "deepseek" | "claude"
    ) => {
      if (!convId || msgs.length === 0) return;
      const history = loadHistory();
      const existing = history.find((c) => c.id === convId);
      const title =
        msgs.find((m) => m.role === "user")?.content.slice(0, 45) ??
        (ru ? "Новый разговор" : "New conversation");
      const conv: SavedConversation = {
        id: convId,
        provider: prov,
        title,
        messages: msgs,
        session: sess,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = upsertInHistory(history, conv);
      persistHistory(updated);
      setConversations(updated);
    },
    [ru]
  );

  // ── Navigation ───────────────────────────────────────────────────────────────

  const startNewConversation = useCallback(() => {
    const { messages, session, activeConvId, provider } = snap.current;
    saveConv(messages, session, activeConvId, provider);
    const newId = crypto.randomUUID();
    localStorage.setItem(ACTIVE_KEY, newId);
    setActiveConvId(newId);
    setMessages([]);
    setSession(null);
    setError(null);
    setSessionError(null);
    setSessionsRemaining(null);
    setShowHistory(false);
  }, [saveConv]);

  const loadConversation = useCallback(
    (conv: SavedConversation) => {
      const { messages, session, activeConvId, provider } = snap.current;
      saveConv(messages, session, activeConvId, provider);
      localStorage.setItem(ACTIVE_KEY, conv.id);
      setActiveConvId(conv.id);
      setProvider(conv.provider);
      setMessages(conv.messages);
      setSession(conv.session);
      setError(null);
      setSessionError(null);
      setShowHistory(false);
    },
    [saveConv]
  );

  const deleteConversation = useCallback((id: string) => {
    const newHistory = loadHistory().filter((c) => c.id !== id);
    persistHistory(newHistory);
    setConversations(newHistory);
    // If deleting current, start fresh without saving it
    if (snap.current.activeConvId === id) {
      const newId = crypto.randomUUID();
      localStorage.setItem(ACTIVE_KEY, newId);
      setActiveConvId(newId);
      setMessages([]);
      setSession(null);
      setError(null);
      setSessionError(null);
      setSessionsRemaining(null);
      setShowHistory(false);
    }
  }, []);

  const handleProviderChange = useCallback(
    (newProvider: "deepseek" | "claude") => {
      const { messages, session, activeConvId, provider } = snap.current;
      if (newProvider === provider) return;
      saveConv(messages, session, activeConvId, provider);

      // Load most recent conversation for the new provider, or start fresh
      const history = loadHistory();
      const recent = history.find(
        (c) => c.provider === newProvider && c.messages.length > 0
      );
      if (recent) {
        localStorage.setItem(ACTIVE_KEY, recent.id);
        setActiveConvId(recent.id);
        setMessages(recent.messages);
        setSession(recent.session);
      } else {
        const newId = crypto.randomUUID();
        localStorage.setItem(ACTIVE_KEY, newId);
        setActiveConvId(newId);
        setMessages([]);
        setSession(null);
      }
      setProvider(newProvider);
      setError(null);
      setSessionError(null);
    },
    [saveConv]
  );

  // ── Send ─────────────────────────────────────────────────────────────────────

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    if (!user) {
      setSessionError("no_auth");
      return;
    }

    const { session: currentSession, activeConvId, provider } = snap.current;

    if (currentSession && currentSession.messagesUsed >= currentSession.messagesLimit) {
      return;
    }

    let activeSession = currentSession;

    if (!activeSession) {
      try {
        const resp = await fetch("/api/session/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider }),
        });
        if (resp.status === 401) { setSessionError("no_auth"); return; }
        if (resp.status === 402) { setSessionError("no_sessions"); return; }
        if (!resp.ok) { setError("Failed to start session"); return; }
        const data = await resp.json();
        activeSession = { id: data.sessionId, messagesUsed: 0, messagesLimit: data.messagesLimit };
        setSession(activeSession);
        setSessionsRemaining(data.sessionsRemaining);
        setSessionError(null);
      } catch {
        setError("Failed to start session");
        return;
      }
    }

    setInput("");
    setError(null);

    const userMsg: ChatMessage = { role: "user", content: text };
    const baseMessages = [...snap.current.messages, userMsg];
    setMessages(baseMessages);
    setIsLoading(true);

    // Track final state explicitly to save correctly after stream
    let finalMessages = baseMessages;
    let finalSession = activeSession;

    try {
      const results = getResults();
      const chatHistory: AIMessage[] = snap.current.messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatHistory,
          provider,
          locale,
          criticismMode,
          results,
          sessionId: activeSession.id,
          ...(reportContext ? { reportContext } : {}),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (response.status === 402) setSessionError("no_sessions");
        throw new Error(err.error || "API error");
      }

      const newCount = activeSession.messagesUsed + 1;
      const updatedSession = { ...activeSession, messagesUsed: newCount };
      setSession(updatedSession);
      finalSession = updatedSession;

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n").filter((l) => l.trim())) {
          if (line === "data: [DONE]") break;
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.content) {
                assistantContent += json.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              /* skip malformed SSE */
            }
          }
        }
      }

      finalMessages = [...baseMessages, { role: "assistant", content: assistantContent }];
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.content !== ""));
      finalMessages = baseMessages;
    } finally {
      setIsLoading(false);
      saveConv(finalMessages, finalSession, activeConvId, provider);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Derived ──────────────────────────────────────────────────────────────────

  const results = typeof window !== "undefined" ? getResults() : [];
  const hasResults = results.length > 0;

  const sessionExhausted = session && session.messagesUsed >= session.messagesLimit;
  const sessionWarning =
    session &&
    session.messagesLimit > 0 &&
    session.messagesUsed >= Math.floor(session.messagesLimit * 0.8) &&
    !sessionExhausted;
  const sessionPct =
    session && session.messagesLimit > 0
      ? Math.round((session.messagesUsed / session.messagesLimit) * 100)
      : 0;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6" />
            {t("coach")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{t("coachDesc")}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setConversations(loadHistory());
            setShowHistory(true);
          }}
          className="gap-2"
        >
          <History className="h-4 w-4" />
          {ru ? "История" : "History"}
          {conversations.length > 0 && (
            <span className="text-[11px] text-muted-foreground">
              ({conversations.length})
            </span>
          )}
        </Button>
      </div>

      {/* Settings row */}
      <div className="flex flex-wrap items-center gap-4">

        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
            criticismMode ? "border-orange-500/30 bg-orange-500/5" : ""
          }`}
        >
          <Shield
            className={`h-3.5 w-3.5 ${
              criticismMode ? "text-orange-500" : "text-muted-foreground"
            }`}
          />
          <Label htmlFor="coach-criticism" className="text-xs cursor-pointer">
            {t("criticismMode")}
          </Label>
          <Switch
            id="coach-criticism"
            checked={criticismMode}
            onCheckedChange={setCriticismMode}
            className="scale-75"
          />
        </div>

        {reportContext && (
          <Link href="/full-report" className="flex items-center gap-1 text-xs text-amber-600 bg-amber-500/10 rounded-full px-2 py-1 hover:bg-amber-500/20 transition-colors">
            <Crown className="h-3 w-3" />
            {ru ? "Профиль загружен" : "Profile loaded"}
          </Link>
        )}
        {hasResults && !reportContext && (
          <span className="text-xs text-green-600 bg-green-500/10 rounded-full px-2 py-1">
            {ru
              ? `${results.length} тест(ов) загружено`
              : `${results.length} test(s) loaded`}
          </span>
        )}
      </div>

      {/* Session status bar */}
      {session && session.messagesLimit > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {ru ? "Сессия:" : "Session:"} {session.messagesUsed}/
                {session.messagesLimit}{" "}
                {ru ? "сообщений" : "messages"}
              </span>
              {sessionsRemaining !== null && (
                <span>
                  {sessionsRemaining}{" "}
                  {ru ? "сессий осталось" : "sessions left"}
                </span>
              )}
            </div>
            <Progress
              value={sessionPct}
              className={`h-1.5 ${
                sessionWarning
                  ? "[&>div]:bg-amber-500"
                  : sessionExhausted
                  ? "[&>div]:bg-destructive"
                  : ""
              }`}
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={startNewConversation}
            className="h-7 gap-1 text-xs shrink-0"
          >
            <Plus className="h-3 w-3" />
            {ru ? "Новый" : "New"}
          </Button>
        </div>
      )}

      {/* No auth banner */}
      {sessionError === "no_auth" && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm">
            {ru ? "Войдите, чтобы начать чат" : "Sign in to start chatting"}
          </p>
          <Link href={`/${locale}/login?next=/${locale}/coach`}>
            <Button size="sm" className="gap-1 shrink-0">
              {ru ? "Войти" : "Sign in"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* No sessions banner */}
      {sessionError === "no_sessions" && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">
              {ru ? "Нет доступных сессий" : "No sessions available"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ru
                ? "Купите пакет сессий для продолжения"
                : "Purchase a session pack to continue"}
            </p>
          </div>
          <Link href="/pricing">
            <Button size="sm" variant="destructive" className="shrink-0">
              {ru ? "Купить сессии" : "Buy sessions"}
            </Button>
          </Link>
        </div>
      )}

      {/* Session warning */}
      {sessionWarning && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {ru
            ? `Осталось ${session!.messagesLimit - session!.messagesUsed} сообщений в сессии`
            : `${session!.messagesLimit - session!.messagesUsed} messages left in session`}
        </div>
      )}

      {/* Session exhausted */}
      {sessionExhausted && (
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
              {ru ? "Лимит сессии исчерпан" : "Session limit reached"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ru
                ? "Начните новый разговор или купите больше сессий"
                : "Start a new conversation or buy more sessions"}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={startNewConversation}
              className="gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              {ru ? "Новый разговор" : "New conversation"}
            </Button>
            {sessionsRemaining === 0 && (
              <Link href="/pricing">
                <Button size="sm">{ru ? "Купить" : "Buy"}</Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Chat area */}
      <Card className="flex flex-col" style={{ minHeight: "500px" }}>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Bot className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-sm">
                  {sessionError === "no_auth"
                    ? ru
                      ? "Войдите, чтобы начать"
                      : "Sign in to start"
                    : sessionError === "no_sessions"
                    ? ru
                      ? "Нет доступных сессий"
                      : "No sessions available"
                    : ru
                    ? reportContext
                      ? "Я знаю ваш полный психологический профиль. Спросите о карьере, отношениях, развитии — отвечу с учётом ваших личных черт."
                      : hasResults
                      ? "Я знаю ваши результаты тестов. Спросите меня что угодно о вашем профиле!"
                      : "Пройдите тесты, чтобы я мог дать персональные рекомендации. Или задайте общий вопрос."
                    : reportContext
                    ? "I know your full psychological profile. Ask me about career, relationships, growth — I'll answer based on your specific traits."
                    : hasResults
                    ? "I know your test results. Ask me anything about your profile!"
                    : "Take some tests so I can give personalized advice. Or ask a general question."}
                </p>
                {criticismMode && (
                  <p className="text-orange-500 text-xs mt-2 font-medium">
                    {t("criticismWarning")}
                  </p>
                )}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownText text={msg.content} />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                  {msg.role === "assistant" &&
                    msg.content === "" &&
                    isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-3">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                sessionExhausted
                  ? ru
                    ? "Начните новый разговор выше"
                    : "Start a new conversation above"
                  : t("askQuestion")
              }
              className="min-h-[50px] max-h-[120px] resize-none text-sm"
              disabled={isLoading || !!sessionExhausted}
            />
            <Button
              size="icon"
              className="shrink-0 self-end"
              onClick={handleSend}
              disabled={isLoading || !input.trim() || !!sessionExhausted}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Sheet */}
      <Sheet open={showHistory} onOpenChange={(open) => setShowHistory(open)}>
        <SheetContent side="left" className="w-[300px] sm:w-[360px] flex flex-col p-0">
          <SheetHeader className="px-4 pt-4 pb-3 border-b">
            <SheetTitle>
              {ru ? "История разговоров" : "Conversation history"}
            </SheetTitle>
          </SheetHeader>

          <div className="px-3 pt-3">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={startNewConversation}
            >
              <Plus className="h-4 w-4" />
              {ru ? "Новый разговор" : "New conversation"}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
            {conversations.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-10">
                {ru
                  ? "Нет сохранённых разговоров"
                  : "No saved conversations yet"}
              </p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-start gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted ${
                    conv.id === activeConvId ? "bg-muted" : ""
                  }`}
                  onClick={() => loadConversation(conv)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate leading-snug">
                      {conv.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] h-4 px-1 shrink-0"
                      >
                        {conv.provider === "deepseek" ? "DS" : "CL"}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground truncate">
                        {fmtDate(conv.updatedAt, ru)} ·{" "}
                        {conv.messages.length}{" "}
                        {ru ? "сообщ." : "msg"}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
