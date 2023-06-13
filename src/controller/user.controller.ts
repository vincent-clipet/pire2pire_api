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
  import { UserService } from '../service/user.service'
  import { User as UserModel } from '@prisma/client'
  
  @Controller()
  export class UserController {
	constructor(private readonly userService: UserService) { }
  
	@Get('user/:id')
	async getUserById(@Param('id') id: string): Promise<UserModel> {
		return this.userService.user.findUnique({ where: { id: Number(id) } })
	}
  
	@Get('users')
	async getAllUsers(): Promise<UserModel[]> {
	  return this.userService.user.findMany()
	}

	@Post('user/signup')
	async signupUser(
	  @Body() userData: { name?: string; password: string },
	): Promise<UserModel> {
	  return this.userService.user.create({
		data: {
		  name: userData?.name,
		  password: userData.password,
		},
	  })
	}
  }