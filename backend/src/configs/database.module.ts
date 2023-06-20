import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IConfig } from './app-config.interface';

@Module({
  imports: [
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
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
