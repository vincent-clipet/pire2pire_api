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
    Module as ModuleModel,
    Lesson as LessonModel,
} from "@prisma/client"
import { Role } from "src/auth/decorator"
import { Roles } from "src/auth/constant"

@Controller("module")
export class ModuleController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get("list")
    async getAllModules(): Promise<ModuleModel[]>{
        return this.prismaService.module.findMany()
    }

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get(":id")
    async getModuleById(@Param("id") id: string): Promise<ModuleModel>{
        return this.prismaService.module.findUnique({where:{id:Number(id)}})
    }

    @Role(
		Roles.Admin
	)
    @Post("create")
    async moduleCreate(
        @Body() moduleData: {
            name?: string;
            lesson: LessonModel[]
        }
    ): Promise<ModuleModel>{
        const module = this.prismaService.module.create({
            data:{
                name: moduleData?.name,
            }
        });

        for(let i=0;i<moduleData.lesson.length;i++){
            this.prismaService.moduleLesson.create({
                data:{
                    moduleId: (await module).id,
                    lessonId: moduleData.lesson[i].id
                }
            });
        }

        return module
    }

    @Role(
		Roles.Admin
	)
    @Delete(":id/delete")
    async moduleDelete(
        @Param("id") id:string
    ): Promise<ModuleModel>{
        const relation = await this.prismaService.moduleLesson.findMany({
            where: {moduleId: Number(id)}
        })
        
        for(let i=0;i<relation.length;i++){
            this.prismaService.moduleLesson.delete({
                where: {id: Number(relation[i].id)}
            })
        }

        return this.prismaService.module.delete({
            where: {id: Number(id)}
        })
    }

    @Role(
		Roles.Admin
	)
    @Put(":id/update/")
    async moduleUpdate(
        @Param("id") id:string,
        @Body() moduleData: {
            name?: string,
            addLesson: LessonModel[],
            delLesson: LessonModel[]
        }
    ): Promise<ModuleModel>{
        for(let i=0;i<moduleData.addLesson.length;i++){
            this.prismaService.moduleLesson.create({
                data:{
                    moduleId: Number(id),
                    lessonId: moduleData.addLesson[i].id
                }
            });
        }

        for(let i=0;i<moduleData.delLesson.length;i++){
            const relation = await this.prismaService.moduleLesson.findFirst({
                where: {
                    lessonId: moduleData.delLesson[i].id,
                    moduleId: Number(id)
                }
            })
            this.prismaService.moduleLesson.delete({
                where: {id: relation.id}
            })
        }
        return moduleData.name === undefined ?
        null :
        this.prismaService.module.update({
            where: {
                id: Number(id)
            },
            data: {
                name: moduleData.name
            }
        })
    }
}