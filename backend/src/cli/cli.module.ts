import { commands } from './commands';
import { Module } from '@nestjs/common';
import { questionSets } from './questions';
import { UserCommandService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@apis/user/models';
import { MongoModule } from '@configs/database/mongo.module';
import { ConfigModule } from '@configs/config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [...questionSets, ...commands, UserCommandService],
})
export class CliModule {}
