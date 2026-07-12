export interface ShareCardData {
  testName: string;
  topDimName: string;
  topDimScore: number;
  topDimColor: string;
  summary: string;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    if (ctx.measureText(current + " " + words[i]).width < maxWidth) {
      current += " " + words[i];
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

export function generateShareCard(data: ShareCardData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const S = 1080;
    const PAD = 80;
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Canvas not supported"));

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, S, S);
    bg.addColorStop(0, "#1a1140");
    bg.addColorStop(1, "#0d1a35");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, S, S);

    // Decorative glows
    const glow1 = ctx.createRadialGradient(S + 80, -80, 0, S + 80, -80, 520);
    glow1.addColorStop(0, data.topDimColor + "25");
    glow1.addColorStop(1, "transparent");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, S, S);

    const glow2 = ctx.createRadialGradient(-80, S + 80, 0, -80, S + 80, 420);
    glow2.addColorStop(0, data.topDimColor + "18");
    glow2.addColorStop(1, "transparent");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, S, S);

    const font = (w: string, sz: number) =>
      `${w} ${sz}px -apple-system, 'Segoe UI', system-ui, sans-serif`;

    // App name
    ctx.font = font("500", 34);
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.fillText("✦ Познай Себя", PAD, PAD + 34);

    // Test name
    ctx.font = font("700", 46);
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.fillText(data.testName, PAD, PAD + 112);

    // Accent bar
    ctx.fillStyle = data.topDimColor;
    ctx.fillRect(PAD, PAD + 130, 90, 4);

    // Big score
    ctx.font = font("800", 190);
    ctx.fillStyle = data.topDimColor;
    ctx.fillText(`${data.topDimScore}%`, PAD - 8, PAD + 350);

    // Dimension name
    ctx.font = font("700", 60);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(data.topDimName, PAD, PAD + 432);

    // Summary text (wrapped, max 3 lines)
    ctx.font = font("400", 36);
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    const lines = wrapText(ctx, `"${data.summary}"`, S - PAD * 2);
    lines.slice(0, 3).forEach((line, i) => {
      ctx.fillText(line, PAD, PAD + 530 + i * 52);
    });

    // Bottom divider
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(PAD, S - PAD - 52, S - PAD * 2, 1);

    // URL
    ctx.font = font("500", 30);
    ctx.fillStyle = "rgba(255,255,255,0.32)";
    ctx.fillText("poznaisebya27.ru", PAD, S - PAD - 18);

    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("toBlob failed"));
    }, "image/png");
  });
}
