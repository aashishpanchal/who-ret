import { Module } from '@nestjs/common';
import { QueryModule } from './modules/query';
import { ApisModule } from '@apis/apis.module';
import { ConfigsModule, DatabaseModule, RedisCacheModule } from './configs';

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    RedisCacheModule,
    QueryModule,
    ApisModule,
  ],
})
export class AppModule {}
