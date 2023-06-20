import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import {
    Permission as PermissionModel
} from "@prisma/client"
import { Role } from "src/auth/decorator"
import { permissionRole } from "src/auth/permissionRole"

@Controller("permission")
export class PermissionController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		permissionRole.getListPermission
	)
    @Get("list")
    async getAllRole(): Promise<PermissionModel[]>{
        return this.prismaService.permission.findMany()
    }

    async getAllPermissionWithRole(): Promise<object[]>{
        return this.prismaService.permission.findMany({
            include: {
                roles:{
                    include:{
                        role: {
                            select:{
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.getPermission
	)
    @Get(":id")
    async getPermissionById(@Param("id") id:string): Promise<PermissionModel>{
        return this.prismaService.permission.findUnique({where:{id:Number(id)}})
    }

    @Role(
		permissionRole.createPermission
	)
    @Post("create")
    async permissionCreate(
        @Body() permissionData: {
            name: string,
            description: string
        } 
    ): Promise<PermissionModel>{
        return this.prismaService.permission.create({
            data:{
                name: permissionData.name,
                description: permissionData.description
            }
        });
    }

    @Role(
		permissionRole.deletePermission
	)
    @Delete(":id/delete")
    async permissionDelete(
        @Param("id") id: string
    ): Promise<PermissionModel>{
        const relation = await this.prismaService.rolePermission.findMany({
            where: {permissionId: Number(id)}
        });

        for(let i=0; i<relation.length;i++){
            this.prismaService.rolePermission.delete({
                where: {id:Number(relation[i].id)}
            })
        }

        return this.prismaService.permission.delete({
            where: {id: Number(id)}
        })
    }

    @Role(
		permissionRole.deletePermission
	)
    @Put(":id/update")
    async permissionUpdate(
        @Param("id") id:string,
        @Body() permissionData: {
            name?:string,
            description?:string
        }
    ): Promise<PermissionModel>{
        return this.prismaService.permission.update({
            where: {id: Number(id)},
            data: {
                name: permissionData.name,
                description: permissionData.description
            }
        })
    }
}