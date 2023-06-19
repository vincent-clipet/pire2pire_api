import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    NotFoundException
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import {
    Role as RoleModel,
    Permission as PermissionModel
} from "@prisma/client"
import { Roles } from "src/auth/constant"
import { Role } from "src/auth/decorator"

@Controller("role")
export class RoleController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		Roles.Admin
	)
    @Get("list")
    async getAllRole(): Promise<RoleModel[]>{
        return this.prismaService.role.findMany()
    }

    @Role(
		Roles.Admin
	)
    @Get(":id")
    async getRoleById(@Param("id") id:string): Promise<RoleModel>{
        return this.prismaService.role.findUnique({where:{id:Number(id)}})
    }

    @Role(
		Roles.Admin
	)
    @Post("create")
    async roleCreate(
        @Body() roleData: {
            name: string,
            permissions?: number[]
        }
    ): Promise<RoleModel>{
        // Create role
        const role = this.prismaService.role.create({
            data:{
                name: roleData.name,
            }
        });
        // Create relations with permissions
        for(let i=0;i<roleData.permissions.length;i++){
            this.prismaService.rolePermission.create({
                data:{
                    roleId: (await role).id,
                    permissionId: roleData.permissions[i]
                }
            });
        }
        return role
    }

    @Role(
		Roles.Admin
	)
    @Delete(":id/delete")
    async roleDelete(
        @Param("id") id: string
    ): Promise<RoleModel>{
        // Delete role
        return this.prismaService.role.delete({
            where: {id:Number(id)}
        }).catch(() => {
            throw new NotFoundException()
        })
    }

    @Role(
		Roles.Admin
	)
    @Put(":id/update")
    async roleUpdate(
        @Param("id") id:string,
        @Body() roleData: {
            name?: string,
            addPermissions?: number[],
            deletePermissions?: number[] 
        }
    ): Promise<RoleModel>{
        // Create relations with permissions
        if (roleData.addPermissions) {
            for(let i=0;i<roleData.addPermissions.length;i++){
                await this.prismaService.rolePermission.create({
                    data: {
                        roleId: Number(id),
                        permissionId: roleData.addPermissions[i]
                    }
                });
            }
        }
        // Delete relations with permissions
        if (roleData.deletePermissions) {
            for(let i=0;i<roleData.deletePermissions.length;i++){
                const relation = await this.prismaService.rolePermission.findFirst({
                    where: {
                        roleId: Number(id),
                        permissionId: roleData.deletePermissions[i]
                    }
                });
                this.prismaService.rolePermission.delete({
                    where: {id: relation.id}
                })
            }
        }
        // Update training
        if (roleData.name !== undefined) {
            this.prismaService.role.update({ 
                where: { id: Number(id) },
                data: { name: roleData.name }
            })
        }
        // Return training
        return this.prismaService.role.findUnique({
            where: { id: Number(id) }
        })
    }
}