import { RedisCache } from '@/core/interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {}
}
