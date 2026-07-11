"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, Shield, User, Loader2, Trash2, Plus, ArrowRight, AlertTriangle } from "lucide-react";
import { getResults } from "@/lib/test-engine/results-store";
import { AIMessage } from "@/lib/ai/types";
import { Link } from "@/lib/i18n/navigation";
import { useUser } from "@/hooks/useUser";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SessionState {
  id: string;
  messagesUsed: number;
  messagesLimit: number;
}

function getSessionKey(provider: string) {
  return `coach-session-${provider}`;
}

function getChatKey(provider: string) {
  return `coach-chat-${provider}`;
}

function loadSession(provider: string): SessionState | null {
  try {
    const raw = localStorage.getItem(getSessionKey(provider));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(provider: string, s: SessionState) {
  localStorage.setItem(getSessionKey(provider), JSON.stringify(s));
}

function clearSession(provider: string) {
  localStorage.removeItem(getSessionKey(provider));
}

export default function CoachPage() {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("ai");
  const { user } = useUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [criticismMode, setCriticismMode] = useState(false);
  const [provider, setProvider] = useState<"deepseek" | "claude">("deepseek");
  const [error, setError] = useState<string | null>(null);

  // Session state
  const [session, setSession] = useState<SessionState | null>(null);
  const [sessionsRemaining, setSessionsRemaining] = useState<number | null>(null);
  const [sessionError, setSessionError] = useState<"no_auth" | "no_sessions" | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved state for current provider on mount or provider switch
  useEffect(() => {
    const savedMsgs = localStorage.getItem(getChatKey(provider));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(savedMsgs ? JSON.parse(savedMsgs) : []);

    const savedSession = loadSession(provider);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(savedSession);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionError(null);
  }, [provider]);

  // Persist messages
  useEffect(() => {
    if (messages.length === 0) {
      localStorage.removeItem(getChatKey(provider));
    } else {
      localStorage.setItem(getChatKey(provider), JSON.stringify(messages));
    }
  }, [messages, provider]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewSession = useCallback(() => {
    clearSession(provider);
    setSession(null);
    setMessages([]);
    localStorage.removeItem(getChatKey(provider));
    setError(null);
    setSessionError(null);
    setSessionsRemaining(null);
  }, [provider]);

  const handleProviderChange = useCallback((newProvider: "deepseek" | "claude") => {
    setProvider(newProvider);
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    if (!user) {
      setSessionError("no_auth");
      return;
    }

    // Check session limit
    if (session && session.messagesUsed >= session.messagesLimit) {
      return;
    }

    let activeSession = session;

    // Start a new session if none exists
    if (!activeSession) {
      try {
        const resp = await fetch("/api/session/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider }),
        });

        if (resp.status === 401) {
          setSessionError("no_auth");
          return;
        }

        if (resp.status === 402) {
          setSessionError("no_sessions");
          return;
        }

        if (!resp.ok) {
          setError("Failed to start session");
          return;
        }

        const data = await resp.json();
        activeSession = { id: data.sessionId, messagesUsed: 0, messagesLimit: data.messagesLimit };
        setSession(activeSession);
        saveSession(provider, activeSession);
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
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const results = getResults();
      const chatHistory: AIMessage[] = messages.map((m) => ({
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
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (response.status === 402) {
          setSessionError("no_sessions");
        }
        throw new Error(err.error || "API error");
      }

      // Increment local message count
      const newCount = activeSession.messagesUsed + 1;
      const updatedSession = { ...activeSession, messagesUsed: newCount };
      setSession(updatedSession);
      saveSession(provider, updatedSession);

      // Stream response
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.trim());

        for (const line of lines) {
          if (line === "data: [DONE]") break;
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.content) {
                assistantContent += json.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                  return updated;
                });
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    // Keep session counter — clearing doesn't start a new session
    localStorage.removeItem(getChatKey(provider));
  };

  const results = typeof window !== "undefined" ? getResults() : [];
  const hasResults = results.length > 0;
  const ru = locale === "ru";

  const sessionExhausted = session && session.messagesUsed >= session.messagesLimit;
  const sessionWarning =
    session &&
    session.messagesLimit > 0 &&
    session.messagesUsed >= Math.floor(session.messagesLimit * 0.8) &&
    !sessionExhausted;
  const sessionPct = session && session.messagesLimit > 0
    ? Math.round((session.messagesUsed / session.messagesLimit) * 100)
    : 0;

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
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat} className="gap-1">
            <Trash2 className="h-3.5 w-3.5" />
            {ru ? "Очистить" : "Clear"}
          </Button>
        )}
      </div>

      {/* Settings row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">{t("provider")}:</Label>
          <Select value={provider} onValueChange={(v) => handleProviderChange(v as "deepseek" | "claude")}>
            <SelectTrigger className="w-[200px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deepseek">{t("deepseek")}</SelectItem>
              <SelectItem value="claude">{t("claude")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
            criticismMode ? "border-orange-500/30 bg-orange-500/5" : ""
          }`}
        >
          <Shield className={`h-3.5 w-3.5 ${criticismMode ? "text-orange-500" : "text-muted-foreground"}`} />
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

        {hasResults && (
          <span className="text-xs text-green-600 bg-green-500/10 rounded-full px-2 py-1">
            {ru ? `${results.length} тест(ов) загружено` : `${results.length} test(s) loaded`}
          </span>
        )}
      </div>

      {/* Session status bar */}
      {session && session.messagesLimit > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {ru ? "Сессия:" : "Session:"} {session.messagesUsed}/{session.messagesLimit} {ru ? "сообщений" : "messages"}
              </span>
              {sessionsRemaining !== null && (
                <span>{sessionsRemaining} {ru ? "сессий осталось" : "sessions left"}</span>
              )}
            </div>
            <Progress
              value={sessionPct}
              className={`h-1.5 ${sessionWarning ? "[&>div]:bg-amber-500" : sessionExhausted ? "[&>div]:bg-destructive" : ""}`}
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleNewSession}
            className="h-7 gap-1 text-xs shrink-0"
          >
            <Plus className="h-3 w-3" />
            {ru ? "Новая" : "New"}
          </Button>
        </div>
      )}

      {/* No auth banner */}
      {sessionError === "no_auth" && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm">{ru ? "Войдите, чтобы начать чат" : "Sign in to start chatting"}</p>
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
              {ru ? "Купите пакет сессий для продолжения" : "Purchase a session pack to continue"}
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
              {ru ? "Начните новую сессию или купите больше" : "Start a new session or buy more"}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="outline" onClick={handleNewSession} className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              {ru ? "Новая сессия" : "New session"}
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
                    ? (ru ? "Войдите, чтобы начать" : "Sign in to start")
                    : sessionError === "no_sessions"
                    ? (ru ? "Нет доступных сессий" : "No sessions available")
                    : ru
                    ? hasResults
                      ? "Я знаю ваши результаты тестов. Спросите меня что угодно о вашем профиле!"
                      : "Пройдите тесты, чтобы я мог дать персональные рекомендации. Или задайте общий вопрос."
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
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === "assistant" && msg.content === "" && isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
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
              placeholder={sessionExhausted
                ? (ru ? "Начните новую сессию выше" : "Start a new session above")
                : t("askQuestion")}
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
    </div>
  );
}
