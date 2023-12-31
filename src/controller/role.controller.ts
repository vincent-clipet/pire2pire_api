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
    Role as RoleModel
} from "@prisma/client"
import { PermissionController } from "./permission.controller"
import { Role } from "src/auth/decorator"
import { permissionRole } from "src/auth/permissionRole"
const fs = require("fs")

@Controller("role")
export class RoleController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		permissionRole.getListRole
	)
    @Get("list")
    async getAllRole(): Promise<RoleModel[]>{
        return this.prismaService.role.findMany({
            include:{
                permissions:{
                    include:{
                        permission: true
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.getRole
	)
    @Get(":id")
    async getRoleById(@Param("id") id:string): Promise<RoleModel>{
        return this.prismaService.role.findUnique({
            where:{id:Number(id)},
            include:{
                permissions:{
                    include:{
                        permission: true
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.createRole
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
		permissionRole.deleteRole
	)
    @Delete(":id/delete")
    async roleDelete(
        @Param("id") id: string
    ): Promise<RoleModel>{
        // Delete role
        return this.prismaService.role.delete({
            where: {id:Number(id)}
        })
    }

    @Role(
		permissionRole.updateRole
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
                const relation = await this.prismaService.rolePermission.findFirst({
                    where: {
                        roleId: Number(id),
                        permissionId: roleData.addPermissions[i]
                    }
                })
                if (relation === null || relation === undefined) {
                    await this.prismaService.rolePermission.create({
                        data: {
                            roleId: Number(id),
                            permissionId: roleData.addPermissions[i]
                        }
                    });
                }
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
                if (relation) {
                    await this.prismaService.rolePermission.delete({
                        where: {id: relation.id}
                    })
                }
            }
        }
        // Update role
        if (roleData.name !== undefined) {
            await this.prismaService.role.update({ 
                where: { id: Number(id) },
                data: { name: roleData.name }
            })
        }

        await this.createFichierPermission();

        // Return role
        return this.prismaService.role.findUnique({
            where: { id: Number(id) }
        })
    }

    async createFichierPermission():Promise<boolean>{
            const permissionController = new PermissionController(new PrismaService)
            let permissions: object = {};
            (await permissionController.getAllPermissionWithRole()).forEach(item => {
                permissions[item["name"]] = []
                item["roles"].forEach((role:object) => {
                    permissions[item["name"]].push(role["roleId"]);
                });
            });

            fs.writeFile("src/auth/permissionRole.ts",`export const permissionRole = ${JSON.stringify(permissions)}`, (e) => {
                if(e) throw e;
            });
            return true
        }
}