export interface ShareDimension {
  key: string;
  name: string;
  score: number;
  color: string;
}

export interface ShareRadarPoint {
  name: string;
  value: number;
  fullMark: number;
}

export interface ShareCardData {
  testName: string;
  dimensions: ShareDimension[];
  radarData: ShareRadarPoint[];
  summary: string;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
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
      if (lines.length >= maxLines - 1) {
        // last line — dump the rest
        const remaining = words.slice(i).join(" ");
        const last = current + " " + remaining;
        if (ctx.measureText(last).width > maxWidth) {
          // truncate
          let truncated = current;
          for (let j = i + 1; j <= words.length; j++) {
            const test = truncated + "…";
            if (ctx.measureText(test).width > maxWidth) break;
            truncated = words.slice(i - 1, j).join(" ");
          }
          lines.push(truncated + "…");
        } else {
          lines.push(last);
        }
        return lines;
      }
    }
  }
  lines.push(current);
  return lines;
}

function drawRadar(
  ctx: CanvasRenderingContext2D,
  data: ShareRadarPoint[],
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  const N = data.length;
  if (N < 3) return;
  const step = (2 * Math.PI) / N;
  const start = -Math.PI / 2;

  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(start + i * step),
    y: cy + r * Math.sin(start + i * step),
  });

  // Grid rings (5 levels)
  for (let level = 1; level <= 5; level++) {
    const r = (radius * level) / 5;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const p = pt(i, r);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = level === 5 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Axis spokes
  for (let i = 0; i < N; i++) {
    const p = pt(i, radius);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Data fill
  ctx.beginPath();
  for (let i = 0; i < N; i++) {
    const r = (radius * Math.min(data[i].value, data[i].fullMark)) / data[i].fullMark;
    const p = pt(i, r);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
  ctx.fillStyle = color + "30";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Dots
  for (let i = 0; i < N; i++) {
    const r = (radius * Math.min(data[i].value, data[i].fullMark)) / data[i].fullMark;
    const p = pt(i, r);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Labels
  const labelFont = `400 24px -apple-system,'Segoe UI',system-ui,sans-serif`;
  ctx.font = labelFont;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  const lr = radius + 38;
  for (let i = 0; i < N; i++) {
    const angle = start + i * step;
    const lx = cx + lr * Math.cos(angle);
    const ly = cy + lr * Math.sin(angle);
    const label =
      data[i].name.length > 9
        ? data[i].name.slice(0, 8) + "…"
        : data[i].name;
    // anchor: left/center/right depending on position
    const cos = Math.cos(angle);
    ctx.textAlign = cos > 0.3 ? "left" : cos < -0.3 ? "right" : "center";
    ctx.fillText(label, lx, ly + 8);
  }
  ctx.textAlign = "left";
}

export function generateShareCard(data: ShareCardData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const S = 1080;
    const PAD = 68;
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Canvas not supported"));

    const dims = data.dimensions.filter((d) => d.key !== "style");
    const topDim = [...dims].sort((a, b) => b.score - a.score)[0];
    const accentColor = topDim?.color ?? "#7c3aed";

    const f = (w: string, sz: number) =>
      `${w} ${sz}px -apple-system,'Segoe UI',system-ui,sans-serif`;

    // ── Background ──────────────────────────────────────────────
    const bg = ctx.createLinearGradient(0, 0, S, S);
    bg.addColorStop(0, "#16103a");
    bg.addColorStop(1, "#0c1828");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, S, S);

    // Glow blobs
    const addGlow = (gx: number, gy: number, gr: number, alpha: string) => {
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      g.addColorStop(0, accentColor + alpha);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, S, S);
    };
    addGlow(S, 0, 500, "22");
    addGlow(0, S, 380, "16");

    // ── Header ──────────────────────────────────────────────────
    // App brand
    ctx.font = f("500", 30);
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.fillText("✦  Познай Себя", PAD, PAD + 30);

    // Test name
    ctx.font = f("700", 44);
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    // Truncate if too long
    let tName = data.testName;
    while (ctx.measureText(tName).width > S - PAD * 2 - 20 && tName.length > 5) {
      tName = tName.slice(0, -1);
    }
    if (tName !== data.testName) tName += "…";
    ctx.fillText(tName, PAD, PAD + 100);

    // Accent bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(PAD, PAD + 116, 80, 4);

    // ── LEFT COLUMN  x: PAD … 430 ───────────────────────────────
    const leftW = 360;

    // Top dimension — BIG
    if (topDim) {
      ctx.font = f("700", 46);
      ctx.fillStyle = "#ffffff";
      // word-wrap the dim name to left column width
      const nameLines = wrapText(ctx, topDim.name, leftW, 2);
      nameLines.forEach((line, i) => {
        ctx.fillText(line, PAD, PAD + 188 + i * 54);
      });

      ctx.font = f("800", 164);
      ctx.fillStyle = accentColor;
      ctx.fillText(`${topDim.score}%`, PAD - 6, PAD + 400);
    }

    // Separator
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(PAD, PAD + 420, leftW, 1);

    // Other dimensions list
    const others = dims
      .filter((d) => d.key !== topDim?.key)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    others.forEach((dim, i) => {
      const y = PAD + 456 + i * 60;

      // Colored dot
      ctx.beginPath();
      ctx.arc(PAD + 8, y - 6, 7, 0, Math.PI * 2);
      ctx.fillStyle = dim.color;
      ctx.fill();

      // Dim name
      ctx.font = f("500", 26);
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      let dName = dim.name;
      while (ctx.measureText(dName).width > leftW - 80 && dName.length > 4) {
        dName = dName.slice(0, -1);
      }
      if (dName !== dim.name) dName += "…";
      ctx.fillText(dName, PAD + 24, y);

      // Score
      ctx.font = f("600", 26);
      ctx.fillStyle = dim.color;
      ctx.textAlign = "right";
      ctx.fillText(`${dim.score}%`, PAD + leftW, y);
      ctx.textAlign = "left";

      // Mini progress bar
      const barX = PAD + 24;
      const barY = y + 8;
      const barW = leftW - 80;
      const barH = 4;
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = dim.color + "90";
      ctx.fillRect(barX, barY, (barW * dim.score) / 100, barH);
    });

    // ── RIGHT COLUMN — Radar ─────────────────────────────────────
    const hasRadar = data.radarData.length >= 3;
    if (hasRadar) {
      const rcx = 760;
      const rcy = 490;
      const rr = 230;
      drawRadar(ctx, data.radarData, rcx, rcy, rr, accentColor);
    }

    // ── Bottom ──────────────────────────────────────────────────
    const bottomY = 870;
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(PAD, bottomY, S - PAD * 2, 1);

    // Summary
    ctx.font = f("400", 30);
    ctx.fillStyle = "rgba(255,255,255,0.58)";
    const summaryLines = wrapText(
      ctx,
      `"${data.summary}"`,
      S - PAD * 2,
      2
    );
    summaryLines.forEach((line, i) => {
      ctx.fillText(line, PAD, bottomY + 46 + i * 40);
    });

    // URL + CTA
    ctx.font = f("600", 28);
    ctx.fillStyle = "rgba(255,255,255,0.30)";
    ctx.fillText("poznaisebya27.ru", PAD, S - PAD - 10);

    ctx.font = f("600", 28);
    ctx.fillStyle = accentColor + "aa";
    ctx.textAlign = "right";
    ctx.fillText("Узнай себя →", S - PAD, S - PAD - 10);
    ctx.textAlign = "left";

    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("toBlob failed"));
    }, "image/png");
  });
}
