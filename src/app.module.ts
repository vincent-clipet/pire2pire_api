import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { ModuleController } from "./controller/module.controller";
import { LessonController } from "./controller/lesson.controller";
import { FormationController } from "./controller/formation.controller";
import { RoleController } from "./controller/role.controller";
import { PermissionController } from './controller/permission.controller';
import { AuthController } from './controller/auth.controller';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';

import { jwtConstants } from './auth/constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';



@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '600s'
      }
    })
  ],
  controllers: [
    AppController,
    UserController,
    ModuleController,
    LessonController,
    FormationController,
    PermissionController,
    RoleController,
    AuthController
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [
    AuthService
  ]
})
export class AppModule {}
