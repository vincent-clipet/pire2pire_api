import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
