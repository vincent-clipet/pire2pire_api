import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Query,
  } from '@nestjs/common'
  import { PrismaService } from '../prisma.service'
  import { User as UserModel, Prisma } from '@prisma/client'
  
  @Controller()
  export class UserController {
	constructor(private readonly prismaService: PrismaService) { }
  
	@Get('user/:id')
	async getUserById(@Param('id') id: string): Promise<UserModel> {
	  return this.prismaService.user.findUnique({ where: { id: Number(id) } })
	}
  
	@Get('users')
	async getAllUsers(): Promise<UserModel[]> {
	  return this.prismaService.user.findMany()
	}

	@Post('user/signup')
	async signupUser(
	  @Body() userData: { name?: string; password: string },
	): Promise<UserModel> {
	  return this.prismaService.user.create({
		data: {
		  name: userData?.name,
		  password: userData.password,
		},
	  })
	}
  }