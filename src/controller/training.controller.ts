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
    Training as TrainingModel,
    Module as ModuleModel
} from "@prisma/client"



@Controller("training")
export class TrainingController{
    constructor(private readonly prismaService: PrismaService){}

    @Get("list")
    async getAllTraining(): Promise<TrainingModel[]>{
        return this.prismaService.training.findMany({ take: 1000 })
    }

    @Get(":id")
    async getTrainingById(@Param("id") id:string): Promise<TrainingModel>{
        return this.prismaService.training.findUnique({ where: { id: Number(id) } })
    }

    @Post("create")
    async trainingCreate(
        @Body() trainingData: {
            name: string,
            module: ModuleModel[],
            coachId: string
        }
    ): Promise<TrainingModel>{
        // Create training
        const training = this.prismaService.training.create({
            data:{
                name: trainingData.name,
                coachId: Number(trainingData.coachId)
            }
        });
        // Create relations with modules
        for(let i=0;i<trainingData.module.length;i++){
            this.prismaService.trainingModule.create({
                data:{
                    trainingId: (await training).id,
                    moduleId: trainingData.module[i].id
                }
            });
        }
        return training
    }

    @Delete(":id/delete")
    async trainingDelete(
        @Param("id") id:string
    ): Promise<TrainingModel>{
        // Delete training
        return this.prismaService.training.delete({
            where: {id:Number(id)}
        }).catch(() => {
            throw new NotFoundException()
        })
    }
 
    @Put(":id/update")
    async trainingUpdate(
        @Param("id") id:string,
        @Body() trainingData: {
            name?: string,
            addModule?: number[],
            deleteModule?: number[]
        }
    ): Promise<ModuleModel>{
        // Create relations with modules
        if (trainingData.addModule) {
            for(let i=0;i<trainingData.addModule.length;i++){
                await this.prismaService.trainingModule.create({
                    data: {
                        trainingId: Number(id),
                        moduleId: trainingData.addModule[i]
                    }
                });
            }
        }
        // Delete relations with modules
        if (trainingData.deleteModule) {
            for(let i=0;i<trainingData.deleteModule.length;i++){
                const relation = await this.prismaService.trainingModule.findFirst({
                    where: {
                        trainingId: Number(id),
                        moduleId: trainingData.deleteModule[i]
                    }
                });
                this.prismaService.trainingModule.delete({
                    where: {id: relation.id}
                })
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