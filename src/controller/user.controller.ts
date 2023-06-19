import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
} from '@nestjs/common'
import { Public, Role } from 'src/auth/decorator'
import { UserService } from '../service/user.service'
import { User as UserModel } from '@prisma/client'
import { Roles } from 'src/auth/constant'
const argon2 = require("argon2")

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Role(
		Roles.Admin,
		Roles.Apprenant
	)
	@Get('list')
	async getAllUsers(): Promise<UserModel[]> {
	  const allUsers = await this.userService.user.findMany({ take: 1000 })
	  return allUsers //this.userService.strip_passwords(allUsers)
	}

	@Role(
		Roles.Admin,
		Roles.Apprenant
	)
	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<UserModel> {
		const u = await this.userService.user.findUnique({ 
			where: { id: Number(id)	}
		})
		return this.userService.strip_password(u)
	}

	@Role(
		Roles.Admin
	)
	@Put(':id/setrole')
	async setUserRole(
		@Body() userData: { roleId: number },
		@Param('id') id: string
	): Promise<UserModel> {
	  const u = await this.userService.user.update({
		where: {
		  id: Number(id)
		},
		data: {
			roleId: userData.roleId
		},
	  })
	  return this.userService.strip_password(u)
	}

	@Public()
	@Post('signup')
	async signupUser(
	  @Body() userData: { name: string, password: string },
	): Promise<UserModel> {
	  const hash = await argon2.hash(userData.password)
	  const u = await this.userService.user.create({
		data: {
		  name: userData.name,
		  password: argon2.hash(hash),
		},
	  })
	  return this.userService.strip_password(u)
	}

	@Role(
		Roles.Admin
	)
	@Delete(':id/delete')
	async deleteUser(
		@Param("id") id: string
	): Promise<UserModel>{
		return this.userService.user.delete({
			where: {id:Number(id)}
		})
	}
}