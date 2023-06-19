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
import { Roles } from 'src/auth/constant'
import { Role } from 'src/auth/decorator'

@Controller("lesson")
export class LessonController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get("list")
    async getAllLessons(): Promise<LessonModel[]>{
        return this.prismaService.lesson.findMany()
    }

    @Role(
		Roles.Admin,
        Roles.Apprenant
	)
    @Get(":id")
    async getLessonById(@Param('id') id: string): Promise<LessonModel>{
        return this.prismaService.lesson.findUnique({where:{id:Number(id)}})
    }

    @Role(
		Roles.Admin
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
		Roles.Admin
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
		Roles.Admin
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