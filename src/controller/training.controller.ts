import{
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Req
} from "@nestjs/common"
import { Request } from "express"
import { PrismaService } from "src/prisma.service"
import {
    Training as TrainingModel
} from "@prisma/client"
import { permissionRole } from "src/auth/permissionRole"
import { Role } from "src/auth/decorator"
import { JwtService } from "@nestjs/jwt"


@Controller("training")
export class TrainingController{
    constructor(private readonly prismaService: PrismaService){}

    @Role(permissionRole.getListTraining)
    @Get("list")
    async getAllTraining(): Promise<TrainingModel[]>{
        return this.prismaService.training.findMany({
            include:{
                modules:{
                    include:{
                        module:{
                            select:{
                                name: true
                            }
                        }
                    }
                },
                coach:{
                    select:{
                        name:true
                    }
                }
            }
        })
    }

    @Role(permissionRole.getTraining)
    @Get(":id")
    async getTrainingById(@Param("id") id:string): Promise<TrainingModel>{
        return this.prismaService.training.findUnique({
            where: { id: Number(id) },
            include:{
                coach:{
                    select:{
                        name: true
                    }
                },
                modules:{
                    include:{
                        module:{
                            select:{
                                name: true
                            }
                        }
                    }
                },
                users:{
                    include:{
                        user: {
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        })
    }

    @Role(permissionRole.getTrainingStudents)
    @Get(":id/students")
    async getTrainingStudent(@Param("id") id:string): Promise<TrainingModel>{
        return this.prismaService.training.findUnique({
            where: { id: Number(id) },
            include:{
                users:{
                    include:{
                        user: {
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        })
    }

    @Role(permissionRole.createTraining)
    @Post("create")
    async trainingCreate(
        @Body() trainingData: {
            name: string,
            modules: number[],
            coachId: number
        }
    ): Promise<TrainingModel>{
        // Create training
        const training = await this.prismaService.training.create({
            data:{
                name: trainingData.name,
                coachId: Number(trainingData.coachId)
            }
        });
        // Create relations with modules
        for(let i=0;i<trainingData.modules.length;i++){
            await this.prismaService.trainingModule.create({
                data:{
                    trainingId: training.id,
                    moduleId: trainingData.modules[i]
                }
            });
        }
        return training
    }

    @Role(permissionRole.subscribe)
    @Post(":id/subscribe")
    async trainingSubscribe(
        @Req() request: Request,
        @Param('id') id: string
    ): Promise<void>{
        const jwt = request.headers.authorization.replace("Bearer ","");
        const jwtService = new JwtService()
        const payload = jwtService.decode(jwt)
        await this.prismaService.trainingUser.create({
            data:{
                userId: payload["id"],
                trainingId: Number(id)
            }
        })
    }

    @Role(permissionRole.deleteTraining)
    @Delete(":id/delete")
    async trainingDelete(
        @Param("id") id:string
    ): Promise<TrainingModel>{
        // Delete training
        return this.prismaService.training.delete({
            where: {id:Number(id)}
        })
    }
 
    @Role(permissionRole.updateTraining)
    @Put(":id/update")
    async trainingUpdate(
        @Param("id") id:string,
        @Body() trainingData: {
            name?: string,
            addModules?: number[],
            deleteModules?: number[]
        }
    ): Promise<TrainingModel>{
        // Create relations with modules
        if (trainingData.addModules) {
            for(let i=0;i<trainingData.addModules.length;i++){
                const relation = await this.prismaService.trainingModule.findFirst({
                    where: {
                        trainingId: Number(id),
                        moduleId: trainingData.addModules[i]
                    }
                })
                if (relation === null || relation === undefined) {
                    await this.prismaService.trainingModule.create({
                        data: {
                            trainingId: Number(id),
                            moduleId: trainingData.addModules[i]
                        }
                    });
                }
            }
        }
        // Delete relations with modules
        if (trainingData.deleteModules) {
            for(let i=0;i<trainingData.deleteModules.length;i++){
                const relation = await this.prismaService.trainingModule.findFirst({
                    where: {
                        trainingId: Number(id),
                        moduleId: trainingData.deleteModules[i]
                    }
                });
                if (relation) {
                    await this.prismaService.trainingModule.delete({
                        where: {id: relation.id}
                    })
                }
            }
        }
        // Update training
        if (trainingData.name !== undefined) {
            this.prismaService.training.update({ 
                where: { id: Number(id) },
                data: { name: trainingData.name }
            })
        }
        // Return training
        return this.prismaService.training.findUnique({
            where: { id: Number(id) }
        })
    }
}