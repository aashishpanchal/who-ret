import appConfig from './app.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // env config
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class ConfigsModule {}
