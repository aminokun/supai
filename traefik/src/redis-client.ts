import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create Redis connection with retry logic
const redis = new Redis(REDIS_URL, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    console.log(`[Redis] Retrying connection in ${delay}ms (attempt ${times})`);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => {
  console.log('[Redis] Connected successfully');
});

redis.on('error', (error) => {
  console.error('[Redis] Connection error:', error.message);
});

// Session cache TTL in seconds (5 minutes)
const SESSION_CACHE_TTL = 300;

/**
 * Get cached session from Redis
 * @param token - Bearer token
 * @returns Cached session data or null if not found
 */
export async function getCachedSession(token: string): Promise<any | null> {
  try {
    const key = `session:${hashToken(token)}`;
    const cached = await redis.get(key);

    if (cached) {
      console.log('[Redis] Session cache HIT');
      return JSON.parse(cached);
    }

    console.log('[Redis] Session cache MISS');
    return null;
  } catch (error) {
    console.error('[Redis] Error getting cached session:', error);
    return null;
  }
}

/**
 * Cache session data in Redis
 * @param token - Bearer token
 * @param session - Session data to cache
 * @param ttlSeconds - Time to live in seconds (default: 5 minutes)
 */
export async function cacheSession(
  token: string,
  session: any,
  ttlSeconds: number = SESSION_CACHE_TTL
): Promise<void> {
  try {
    const key = `session:${hashToken(token)}`;
    await redis.setex(key, ttlSeconds, JSON.stringify(session));
    console.log(`[Redis] Session cached for ${ttlSeconds}s`);
  } catch (error) {
    console.error('[Redis] Error caching session:', error);
  }
}

/**
 * Invalidate cached session
 * @param token - Bearer token to invalidate
 */
export async function invalidateSession(token: string): Promise<void> {
  try {
    const key = `session:${hashToken(token)}`;
    await redis.del(key);
    console.log('[Redis] Session invalidated');
  } catch (error) {
    console.error('[Redis] Error invalidating session:', error);
  }
}

/**
 * Hash token for use as Redis key (avoid storing raw tokens)
 * Simple hash for key generation - not cryptographic
 */
function hashToken(token: string): string {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Check if Redis is connected
 */
export function isRedisConnected(): boolean {
  return redis.status === 'ready';
}

export default redis;
