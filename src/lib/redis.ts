import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  password: process.env.REDIS_PASSWORD,
  database: parseInt(process.env.REDIS_DB || '1'),
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// 연결 초기화
(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
})();

// 최근 방문 페이지 추가
export async function addRecentPage(userId: string, pageId: string) {
  const key = `user:${userId}:recent_pages`;
  await redisClient.zAdd(key, {
    score: Date.now(),
    value: pageId,
  });
  // 7일 후 자동 만료
  await redisClient.expire(key, 604800);
  // 최대 20개만 유지
  await redisClient.zRemRangeByRank(key, 0, -21);
}

// 최근 방문 페이지 조회
export async function getRecentPages(userId: string, limit: number = 10): Promise<string[]> {
  const key = `user:${userId}:recent_pages`;
  return await redisClient.zRange(key, 0, limit - 1, { REV: true });
}

// 특정 페이지 제거 (페이지 삭제 시)
export async function removeRecentPage(userId: string, pageId: string) {
  const key = `user:${userId}:recent_pages`;
  await redisClient.zRem(key, pageId);
}

export default redisClient;