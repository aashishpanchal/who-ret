import { Module } from '@nestjs/common';
import { QueryModule } from './modules/query';
import { ApisModule } from './apis/apis.module';
import { RedisModule } from './configs/cache/redis.module';
import { ConfigModule } from './configs/config/config.module';
import { MongoModule } from './configs/database/mongo.module';

@Module({
  imports: [ConfigModule, MongoModule, RedisModule, QueryModule, ApisModule],
})
export class AppModule {}
