import appConfig from './app.config';
import { Module } from '@nestjs/common';
import { IConfig } from './app-config.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';

@Module({
  imports: [
    // env config
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
      load: [appConfig],
    }),
    // database configs
    MongooseModule.forRootAsync({
      useFactory(cfs: ConfigService) {
        const db = cfs.get<IConfig['db']>('db');
        return {
          uri: db.uri,
          dbName: db.dbName,
        };
      },
      inject: [ConfigService],
    }),
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
export class ConfigsModule {}
