import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';

@Module({
  imports: [
    // cache manager configs
    CacheModule.registerAsync({
      isGlobal: true,
      async useFactory(cfs: ConfigService) {
        const store = await redisStore({
          url: cfs.get<string>('redis.url'),
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisCacheModule {}
