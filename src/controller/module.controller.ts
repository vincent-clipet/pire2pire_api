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
    Module as ModuleModel
} from "@prisma/client"
import { Role } from "src/auth/decorator"
import { permissionRole } from "src/auth/permissionRole"

@Controller("module")
export class ModuleController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		permissionRole.getListModule
	)
    @Get("list")
    async getAllModules(): Promise<ModuleModel[]>{
        return this.prismaService.module.findMany({
            include: {
                lesson:{
                    include:{
                        lesson:{
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.getModule
	)
    @Get(":id")
    async getModuleById(
            @Param("id") id: string
        ): Promise<ModuleModel>{
        if(Number.isNaN(Number(id))) throw new NotFoundException()
        return this.prismaService.module.findUnique({
            where:{id:Number(id)},
            include: {
                lesson:{
                    include:{
                        lesson:{
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.createModule
	)
    @Post("create")
    async moduleCreate(
        @Body() moduleData: {
            name?: string;
            lessons: number[]
        }
    ): Promise<ModuleModel>{
        // Create module
        const module = this.prismaService.module.create({
            data:{
                name: moduleData.name,
            }
        });
        // Create relations with lessons
        for(let i=0;i<moduleData.lessons.length;i++){
            this.prismaService.moduleLesson.create({
                data:{
                    moduleId: (await module).id,
                    lessonId: moduleData.lessons[i]
                }
            });
        }
        return module
    }

    @Role(
		permissionRole.deleteModule
	)
    @Delete(":id/delete")
    async moduleDelete(
        @Param("id") id:string
    ): Promise<ModuleModel>{
        // Delete module
        return this.prismaService.module.delete({
            where: {id:Number(id)}
        }).catch(() => {
            throw new NotFoundException()
        })
    }

    @Role(
		permissionRole.updateModule
	)
    @Put(":id/update/")
    async moduleUpdate(
        @Param("id") id:string,
        @Body() moduleData: {
            name?: string,
            addLessons: number[],
            deleteLessons: number[]
        }
    ): Promise<ModuleModel>{
        // Create relations with lessons
        if (moduleData.addLessons) {
            for(let i=0;i<moduleData.addLessons.length;i++){
                await this.prismaService.moduleLesson.create({
                    data:{
                        moduleId: Number(id),
                        lessonId: moduleData.addLessons[i]
                    }
                });
            }
        }
        // Delete relations with lessons
        if (moduleData.deleteLessons) {
            for(let i=0;i<moduleData.deleteLessons.length;i++){
                const relation = await this.prismaService.moduleLesson.findFirst({
                    where: {
                        lessonId: moduleData.deleteLessons[i],
                        moduleId: Number(id)
                    }
                })
                await this.prismaService.moduleLesson.delete({
                    where: {id: relation.id}
                })
            }
        }
        // Update module
        if (moduleData.name !== undefined) {
            await this.prismaService.module.update({ 
                where: { id: Number(id) },
                data: { name: moduleData.name }
            })
        }
        // Return module
        return this.prismaService.module.findUnique({
            where: { id: Number(id) }
        })
    }
}