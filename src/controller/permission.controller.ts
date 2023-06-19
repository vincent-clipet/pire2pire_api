import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { Permission as PermissionModel } from "@prisma/client"
import { Role } from "src/auth/decorator"
import { Roles } from "src/auth/constant"

@Controller("permission")
export class PermissionController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get("list")
    async getAllRole(): Promise<PermissionModel[]>{
        return this.prismaService.permission.findMany()
    }

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get(":id")
    async getPermissionById(@Param("id") id:string): Promise<PermissionModel>{
        return this.prismaService.permission.findUnique({where:{id:Number(id)}})
    }

    @Role(
		Roles.Admin
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
		Roles.Admin
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
		Roles.Admin
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