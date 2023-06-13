import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { ModuleController } from "./controller/module.controller";
import { LessonController } from "./controller/lesson.controller";
import { FormationController } from "./controller/formation.controller";

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './service/user.service';

import { RemovePasswordInterceptor } from './interceptor/removepasswordinterceptor.interceptor'



@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ModuleController,
    LessonController,
    FormationController
  ],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
})
export class AppModule {}
