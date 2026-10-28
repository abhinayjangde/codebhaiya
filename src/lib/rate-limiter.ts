import { Redis } from "@upstash/redis";
import env from "@/config/env";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  key: string;
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

const store = new Map<string, RateLimitEntry>();
const redis =
  env.redis.url && env.redis.token
    ? new Redis({ url: env.redis.url, token: env.redis.token })
    : null;

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function getClientIdentifier(req: Request, userId?: string) {
  if (userId) {
    return `user:${userId}`;
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  const ip = forwardedIp || realIp || "unknown";

  return `ip:${ip}`;
}

export function buildRateLimitKey(
  scope: string,
  req: Request,
  userId?: string
) {
  return `${scope}:${getClientIdentifier(req, userId)}`;
}

export function applyRateLimit({
  key,
  maxRequests,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });

    if (store.size > 10_000) {
      cleanupExpiredEntries(now);
    }

    return {
      allowed: true,
      limit: maxRequests,
      remaining: Math.max(maxRequests - 1, 0),
      resetAt,
      retryAfterSeconds: Math.max(Math.ceil(windowMs / 1000), 1),
    };
  }

  existing.count += 1;
  store.set(key, existing);

  const remaining = Math.max(maxRequests - existing.count, 0);
  const retryAfterSeconds = Math.max(
    Math.ceil((existing.resetAt - now) / 1000),
    1
  );

  if (Math.random() < 0.01) {
    cleanupExpiredEntries(now);
  }

  return {
    allowed: existing.count <= maxRequests,
    limit: maxRequests,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds,
  };
}

export function getRateLimitHeaders(result: RateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
    "Retry-After": String(result.retryAfterSeconds),
  };
}

export async function applySharedRateLimit({
  key,
  maxRequests,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  if (!redis) {
    return applyRateLimit({ key, maxRequests, windowMs });
  }

  const redisKey = `rate-limit:${key}`;
  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, Math.ceil(windowMs / 1000));
  }

  const ttlSeconds = Math.max((await redis.ttl(redisKey)) || 1, 1);
  const resetAt = Date.now() + ttlSeconds * 1000;

  return {
    allowed: count <= maxRequests,
    limit: maxRequests,
    remaining: Math.max(maxRequests - count, 0),
    resetAt,
    retryAfterSeconds: ttlSeconds,
  };
}
