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

@Controller()
export class LessonController{
    constructor(private readonly prismaService: PrismaService){}

    @Get("lesson/:id")
    async getLessonById(@Param('id') id: string): Promise<LessonModel>{
        return this.prismaService.lesson.findUnique({where:{id:Number(id)}})
    }

    @Get("lessons")
    async getAllLessons(): Promise<LessonModel[]>{
        return this.prismaService.lesson.findMany()
    }

    @Post('lesson/create')
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

    @Put("lesson/:id/update")
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

    @Delete("lesson/:id/delete")
    async deleteLesson(
        @Param("id") id: string
    ): Promise<LessonModel>{
        return this.prismaService.lesson.delete({
            where: {id: Number(id)}
        })
    }

}