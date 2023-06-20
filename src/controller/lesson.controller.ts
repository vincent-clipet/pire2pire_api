import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Lesson as LessonModel } from '@prisma/client'
import { Role } from 'src/auth/decorator'
import { permissionRole } from "src/auth/permissionRole"

@Controller("lesson")
export class LessonController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		permissionRole.getListLesson
	)
    @Get("list")
    async getAllLessons(): Promise<LessonModel[]>{
        return this.prismaService.lesson.findMany()
    }

    @Role(
		permissionRole.getLesson
	)
    @Get(":id")
    async getLessonById(@Param('id') id: string): Promise<LessonModel>{
        return this.prismaService.lesson.findUnique({where:{id:Number(id)}})
    }

    @Role(
		permissionRole.createLesson
	)
    @Post('create')
    async lessonCreate(
        @Body() lessonData: {
            name?: string; content: string; author: number
        }
    ): Promise<LessonModel>{
        return this.prismaService.lesson.create({
            data:{
                name: lessonData?.name,
                content: lessonData.content,
                authorId: lessonData.author
            }
        })
    }

    @Role(
		permissionRole.updateLesson
	)
    @Put(":id/update")
    async updateLesson(
        @Param('id') id: string,
        @Body() lessonData:{
            content: string
        }
        ): Promise<LessonModel>{
        
        return this.prismaService.lesson.update({
            where: {
                id: Number(id)
            },
            data: {
                content: lessonData.content
            }
        })
    }

    @Role(
		permissionRole.deleteLesson
	)
    @Delete(":id/delete")
    async deleteLesson(
        @Param("id") id: string
    ): Promise<LessonModel>{
        return this.prismaService.lesson.delete({
            where: {id: Number(id)}
        })
    }

}