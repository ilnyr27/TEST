import React from "react";

function renderInline(text: string): React.ReactNode {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={i++}>{match[1]}</strong>);
    } else {
      parts.push(<em key={i++}>{match[2]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 0 ? text : <>{parts}</>;
}

export function MarkdownText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {text.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-lg font-semibold mt-6 mb-2 first:mt-0">
              {renderInline(line.slice(3))}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-base font-semibold mt-4 mb-1">
              {renderInline(line.slice(4))}
            </h3>
          );
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <p key={i} className="flex gap-2 text-sm">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>{renderInline(line.slice(2))}</span>
            </p>
          );
        }
        if (line === "") return <div key={i} className="h-2" />;
        return (
          <p key={i} className="text-sm leading-relaxed">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}
