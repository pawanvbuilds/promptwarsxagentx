import { createHash } from "node:crypto";

interface RateLimitBucket {
  timestamps: number[];
}

const SALT = process.env.RATE_LIMIT_SALT || "venture_architect_secure_salt_2025";

// In-memory sliding window storage (hashed identifier -> bucket)
const analysisBuckets = new Map<string, RateLimitBucket>();
const warRoomBuckets = new Map<string, RateLimitBucket>();

const ANALYSIS_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const ANALYSIS_MAX_REQUESTS = 12;

const WAR_ROOM_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const WAR_ROOM_MAX_REQUESTS = 40;

/**
 * Anonymizes raw client IP or fingerprint using salted SHA-256
 */
export function hashClientIdentifier(rawId: string): string {
  return createHash("sha256")
    .update(`${SALT}:${rawId || "anonymous_client"}`)
    .digest("hex");
}

function checkBucket(
  store: Map<string, RateLimitBucket>,
  hashedKey: string,
  windowMs: number,
  maxAllowed: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = store.get(hashedKey) ?? { timestamps: [] };

  // Evict timestamps outside sliding window
  const validTimestamps = bucket.timestamps.filter((ts) => now - ts < windowMs);
  const allowed = validTimestamps.length < maxAllowed;

  if (allowed) {
    validTimestamps.push(now);
    store.set(hashedKey, { timestamps: validTimestamps });
  } else {
    store.set(hashedKey, { timestamps: validTimestamps });
  }

  const oldest = validTimestamps[0] ?? now;
  const resetAt = oldest + windowMs;
  const remaining = Math.max(0, maxAllowed - validTimestamps.length);

  return { allowed, remaining, resetAt };
}

export function enforceAnalysisQuota(rawClientIp: string) {
  const hashed = hashClientIdentifier(rawClientIp);
  return checkBucket(analysisBuckets, hashed, ANALYSIS_WINDOW_MS, ANALYSIS_MAX_REQUESTS);
}

export function enforceWarRoomQuota(rawClientIp: string) {
  const hashed = hashClientIdentifier(rawClientIp);
  return checkBucket(warRoomBuckets, hashed, WAR_ROOM_WINDOW_MS, WAR_ROOM_MAX_REQUESTS);
}

/**
 * Periodically purge stale records to guarantee bounded memory usage
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of analysisBuckets.entries()) {
    const fresh = bucket.timestamps.filter((t) => now - t < ANALYSIS_WINDOW_MS);
    if (fresh.length === 0) analysisBuckets.delete(key);
    else analysisBuckets.set(key, { timestamps: fresh });
  }
  for (const [key, bucket] of warRoomBuckets.entries()) {
    const fresh = bucket.timestamps.filter((t) => now - t < WAR_ROOM_WINDOW_MS);
    if (fresh.length === 0) warRoomBuckets.delete(key);
    else warRoomBuckets.set(key, { timestamps: fresh });
  }
}, 10 * 60 * 1000).unref();
