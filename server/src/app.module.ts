import { Module } from '@nestjs/common';

import { AppController } from './app.controller';


import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

import dbConfig from "../dbconfig";

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dbConfig

  )],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
