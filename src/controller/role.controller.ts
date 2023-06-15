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
import {
    Role as RoleModel,
    Permission as PermissionModel
} from "@prisma/client"

@Controller()
export class RoleController{
    constructor(private readonly prismaService: PrismaService){}

    @Get("role/:id")
    async getRoleById(@Param("id") id:string): Promise<RoleModel>{
        return this.prismaService.role.findUnique({where:{id:Number(id)}})
    }

    @Get("roles")
    async getAllRole(): Promise<RoleModel[]>{
        return this.prismaService.role.findMany()
    }

    @Post("role/create")
    async roleCreate(
        @Body() roleData: {
            name: string,
            permission: PermissionModel[]
        }
    ): Promise<RoleModel>{
        
        let permissionId:{id:number}[] = []

        roleData.permission.forEach(item => {
            permissionId.push({id:item.id})
        })

        /*for(let i=0;i<roleData.permission.length;i++){

            this.prismaService.rolePermission.create({
                data:{
                    roleId: (await role).id,
                    permissionId: roleData.permission[i].id
                }
            });
        }*/

        return this.prismaService.role.create({
            data:{
                name: roleData.name,
                permission: {
                    connect: permissionId
                }
            }
        });
    }

    @Delete("role/:id/delete")
    async roleDelete(
        @Param("id") id: string
    ): Promise<RoleModel>{
        return this.prismaService.role.delete({
            where: {id:Number(id)}
        });
    }

    @Put("role/:id/update")
    async roleUpdate(
        @Param("id") id:string,
        @Body() roleData: {
            name?: string,
            addPermission?: PermissionModel[],
            delPermission?: PermissionModel[] 
        }
    ): Promise<RoleModel>{
        /*for(let i=0;i<roleData.addPermission.length;i++){
            this.prismaService.rolePermission.create({
                data:{
                    roleId: Number(id),
                    permissionId: roleData.addPermission[i].id
                }
            });
        }

        for(let i=0;i<roleData.delPermission.length;i++){
            const relation = await this.prismaService.rolePermission.findFirst({
                where: {
                    roleId: Number(id),
                    permissionId: roleData.delPermission[i].id
                }
            });

            this.prismaService.rolePermission.delete({
                where: {id: relation.id}
            });
        }*/

        let connectPermissionId:{id:number}[] = []

        roleData.addPermission.forEach(item => {
            connectPermissionId.push({id:item.id})
        })

        let disconnectPermissionId:{id:number}[] = []

        roleData.delPermission.forEach(item => {
            disconnectPermissionId.push({id:item.id})
        })

        return this.prismaService.role.update({
            where: {
                id: Number(id)
            },
            data: {
                name: roleData.name,
                permission: {
                    connect: connectPermissionId,
                    disconnect: disconnectPermissionId
                }
            }
        });
    }
}