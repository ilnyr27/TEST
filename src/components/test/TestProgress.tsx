"use client";

import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";

interface TestProgressProps {
  current: number;
  total: number;
  answeredCount: number;
  timeSpentSeconds: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TestProgress({
  current,
  total,
  answeredCount,
  timeSpentSeconds,
}: TestProgressProps) {
  const t = useTranslations("test");
  const percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {t("questionOf", { current: current + 1, total })}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timeSpentSeconds)}
          </span>
          <span className="font-medium">{percent}%</span>
        </div>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  );
}
