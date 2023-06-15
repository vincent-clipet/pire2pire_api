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
		const u = await this.userService.user.findUnique({ 
			where: { id: Number(id)	}
		})
		return this.userService.strip_password(u)
	}
  
	@Get('users')
	async getAllUsers(): Promise<UserModel[]> {
	  const allUsers = await this.userService.user.findMany()
	  return this.userService.strip_passwords(allUsers)
	}

	@Put('user/:id/role/set')
	async setUserRole(
		@Body() userData: { roleId: number },
		@Param('id') id: string
	): Promise<UserModel> {
	  return this.userService.user.update({
		where: {
		  id: Number(id)
		},
		data: {
			roleId: userData.roleId
		},
	  })
	}

	@Post('user/signup')
	async signupUser(
	  @Body() userData: { name: string; password: string },
	): Promise<UserModel> {
	  return this.userService.user.create({
		data: {
		  name: userData.name,
		  password: userData.password,
		},
	  })
	}
  }