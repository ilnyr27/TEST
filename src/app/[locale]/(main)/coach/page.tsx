"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, Shield, User, Loader2, Trash2 } from "lucide-react";
import { getResults } from "@/lib/test-engine/results-store";
import { AIMessage } from "@/lib/ai/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function CoachPage() {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("ai");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [criticismMode, setCriticismMode] = useState(false);
  const [provider, setProvider] = useState<"deepseek" | "claude">("deepseek");
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restore chat from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("coach-chat");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // Save chat to localStorage when messages change
  useEffect(() => {
    if (messages.length === 0) {
      localStorage.removeItem("coach-chat");
    } else {
      localStorage.setItem("coach-chat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

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
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "API error");
      }

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
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
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
  };

  const results = typeof window !== "undefined" ? getResults() : [];
  const hasResults = results.length > 0;

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
            {locale === "ru" ? "Очистить" : "Clear"}
          </Button>
        )}
      </div>

      {/* Settings row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Provider selector */}
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">{t("provider")}:</Label>
          <Select value={provider} onValueChange={(v) => setProvider(v as "deepseek" | "claude")}>
            <SelectTrigger className="w-[200px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deepseek">{t("deepseek")}</SelectItem>
              <SelectItem value="claude">{t("claude")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Criticism toggle */}
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

        {/* Test data indicator */}
        {hasResults && (
          <span className="text-xs text-green-600 bg-green-500/10 rounded-full px-2 py-1">
            {locale === "ru"
              ? `${results.length} тест(ов) загружено`
              : `${results.length} test(s) loaded`}
          </span>
        )}
      </div>

      {/* Chat area */}
      <Card className="flex flex-col" style={{ minHeight: "500px" }}>
        <CardContent className="flex-1 flex flex-col p-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Bot className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-sm">
                  {locale === "ru"
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

          {/* Error */}
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-3">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("askQuestion")}
              className="min-h-[50px] max-h-[120px] resize-none text-sm"
              disabled={isLoading}
            />
            <Button
              size="icon"
              className="shrink-0 self-end"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
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
