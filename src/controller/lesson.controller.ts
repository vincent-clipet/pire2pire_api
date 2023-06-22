import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Req
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Lesson as LessonModel } from '@prisma/client'
import { Role } from 'src/auth/decorator'
import { permissionRole } from "src/auth/permissionRole"
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

@Controller("lesson")
export class LessonController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(
		permissionRole.getListLesson
	)
    @Get("list")
    async getAllLessons(): Promise<LessonModel[]>{
        return this.prismaService.lesson.findMany(
            {include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }}
        )
    }

    @Role(
		permissionRole.getLesson
	)
    @Get(":id")
    async getLessonById(@Param('id') id: string): Promise<LessonModel>{
        return this.prismaService.lesson.findUnique({
            where:{id:Number(id)},
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    @Role(
		permissionRole.createLesson
	)
    @Post('create')
    async lessonCreate(
        @Req() request: Request,
        @Body() lessonData: {
            name: string; content?: string
        }
    ): Promise<LessonModel>{
        const jwt = request.headers.authorization.replace("Bearer ","");
        const jwtService = new JwtService()
        const payload = jwtService.decode(jwt)
        return this.prismaService.lesson.create({
            data:{
                name: lessonData.name,
                content: lessonData?.content,
                authorId: payload["id"]
            }
        })
    }

    @Role(permissionRole.lessonValidation)
    @Post(":id/validation")
    async lessonValidation(
        @Req() request: Request,
        @Param('id') id: string
    ): Promise<void>{
        const jwt = request.headers.authorization.replace("Bearer ","");
        const jwtService = new JwtService()
        const payload = jwtService.decode(jwt)
        await this.prismaService.userLesson.create({
            data:{
                userId: payload["id"],
                lessonId: Number(id)
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
            name?: string,
            content?: string
        }
        ): Promise<LessonModel>{
        
        return this.prismaService.lesson.update({
            where: {
                id: Number(id)
            },
            data: {
                name: lessonData.name,
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