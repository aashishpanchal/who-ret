import type { Cache } from 'cache-manager';
import type { CacheStore } from '@nestjs/cache-manager';

export type RedisCache = CacheStore & Cache;
