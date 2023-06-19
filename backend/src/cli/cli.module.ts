import { Module } from '@nestjs/common';
import { userCommands } from './commands';
import { questionSets } from './questions';
import { UserModule } from '@/apis/user/user.module';
import { ConfigsModule } from '@/configs/configs.module';

@Module({
  imports: [ConfigsModule, UserModule],
  providers: [...questionSets, ...userCommands],
})
export class CliModule {}
