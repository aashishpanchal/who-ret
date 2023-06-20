import { Module } from '@nestjs/common';
import { userCommands } from './commands';
import { questionSets } from './questions';
import { UserCommandService } from './services';
import { ConfigsModule, DatabaseModule } from '@/configs';
import { ModelModule as UserModelModule } from '@apis/user/models/model.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, UserModelModule],
  providers: [...questionSets, ...userCommands, UserCommandService],
})
export class CliModule {}
