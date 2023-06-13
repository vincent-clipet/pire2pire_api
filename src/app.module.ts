import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { ModuleController } from "./controller/module.controller";
import { LessonController } from "./controller/lesson.controller";

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ModuleController,
    LessonController
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
