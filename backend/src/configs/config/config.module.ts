import appConfig from './app.config';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class ConfigModule {}
