import { Module } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { ConfigsModule } from '@/configs/configs.module';

@Module({
  imports: [ConfigsModule, ApisModule],
})
export class AppModule {}
