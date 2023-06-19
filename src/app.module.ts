import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { ModuleController } from "./controller/module.controller";
import { LessonController } from "./controller/lesson.controller";
import { FormationController } from "./controller/training.controller";
import { RoleController } from "./controller/role.controller";
import { PermissionController } from './controller/permission.controller';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './service/user.service';



@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ModuleController,
    LessonController,
    FormationController,
    PermissionController,
    RoleController
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    UserService
  ],
})
export class AppModule {}
