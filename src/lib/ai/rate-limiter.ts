/**
 * Simple in-memory rate limiter using a Map.
 * No external dependencies — just timestamps per IP.
 */

interface RequestRecord {
  timestamps: number[];
}

const store = new Map<string, RequestRecord>();

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupRunning(windowMs: number) {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of store) {
      record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
      if (record.timestamps.length === 0) {
        store.delete(ip);
      }
    }
  }, CLEANUP_INTERVAL_MS);
  // Don't block Node from exiting
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export function checkRateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  ensureCleanupRunning(windowMs);

  const now = Date.now();
  const record = store.get(ip) ?? { timestamps: [] };

  // Remove timestamps outside the current window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const retryAfterMs = oldest + windowMs - now;
    return { allowed: false, retryAfterMs };
  }

  record.timestamps.push(now);
  store.set(ip, record);
  return { allowed: true, retryAfterMs: 0 };
}
