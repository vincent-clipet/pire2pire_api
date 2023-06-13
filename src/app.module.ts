import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './service/user.service';

import { RemovePasswordInterceptor } from './interceptor/removepasswordinterceptor.interceptor'



@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
  
})
export class AppModule {}
