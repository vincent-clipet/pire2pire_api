import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	NotFoundException,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Public, Role } from 'src/auth/decorator'
import { UserService } from '../service/user.service'
import { User as UserModel } from '@prisma/client'
import { permissionRole } from "src/auth/permissionRole"
const argon2 = require("argon2")

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Role(
		permissionRole.getListUser
	)
	@Get('list')
	async getAllUsers(): Promise<UserModel[]> {
	  const allUsers = await this.userService.user.findMany({ take: 1000 })
	  return this.userService.strip_passwords(allUsers)
	}

	@Role(
		permissionRole.getUser
	)
	@Get(':id')
	async getUserById(@Param('id') id: string): Promise<UserModel> {
		const u = await this.userService.user.findUnique({ 
			where: { id: Number(id)	}
		});
		return u ? this.userService.strip_password(u) : undefined
	}

	@Role(
		permissionRole.setRoleUser
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
	  return u ? this.userService.strip_password(u) : undefined
	}

	@Public()
	@Post('signup')
	async signupUser(
	  @Body() userData: { name: string, password: string, roleId?: number },
	): Promise<UserModel> {
		if(userData.name === undefined || userData.password === undefined) throw new HttpException("name or password empty", HttpStatus.BAD_REQUEST)
	  	const hash = await argon2.hash(userData.password)
	  	const u = await this.userService.user.create({
			data: {
			  	name: userData.name,
			  	password: hash,
			  	roleId: userData.roleId
			},
	  	})
	  	return this.userService.strip_password(u)
	}

	@Role(
		permissionRole.deleteUser
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