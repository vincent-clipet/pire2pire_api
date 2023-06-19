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
    Formation as FormationModel,
    Module as ModuleModel
} from "@prisma/client"



@Controller()
export class FormationController{
    constructor(private readonly prismaService: PrismaService){}
    
    @Get("formation/:id")
    async getFormationById(@Param("id") id:string): Promise<FormationModel>{
        return this.prismaService.formation.findUnique({ where: { id: Number(id) } })
    }

    @Get("formations")
    async getAllFormation(): Promise<FormationModel[]>{
        return this.prismaService.formation.findMany({ take: 1000 })
    }

    @Post("formation/create")
    async formationCreate(
        @Body() formationData: {
            name: string,
            module: ModuleModel[],
            coachId: string
        }
    ): Promise<FormationModel>{
        // Create formation
        const formation = this.prismaService.formation.create({
            data:{
                name: formationData.name,
                coachId: Number(formationData.coachId)
            }
        });
        // Create relations with modules
        for(let i=0;i<formationData.module.length;i++){
            this.prismaService.formationModule.create({
                data:{
                    formationId: (await formation).id,
                    moduleId: formationData.module[i].id
                }
            });
        }
        return formation
    }

    @Delete("formation/:id/delete")
    async formationDelete(
        @Param("id") id:string
    ): Promise<FormationModel>{
        // Delete formation
        return this.prismaService.formation.delete({
            where: {id:Number(id)}
        }).catch(() => {
            throw new NotFoundException()
        })
    }
 
    @Put("formation/:id/update")
    async formationUpdate(
        @Param("id") id:string,
        @Body() formationData: {
            name?: string,
            addModule?: number[],
            deleteModule?: number[]
        }
    ): Promise<ModuleModel>{
        // Create relations with modules
        if (formationData.addModule) {
            for(let i=0;i<formationData.addModule.length;i++){
                const tmp = await this.prismaService.formationModule.create({
                    data: {
                        formationId: Number(id),
                        moduleId: formationData.addModule[i]
                    }
                });
            }
        }
        // Delete relations with modules
        if (formationData.deleteModule) {
            for(let i=0;i<formationData.deleteModule.length;i++){
                const relation = await this.prismaService.formationModule.findFirst({
                    where: {
                        formationId: Number(id),
                        moduleId: formationData.deleteModule[i]
                    }
                });
                this.prismaService.formationModule.delete({ where: {id: relation.id} })
            }
        }
        // Update formation
        if (formationData.name !== undefined) {
            this.prismaService.formation.update({ 
                where: { id: Number(id) },
                data: { name: formationData.name }
            })
        }
        // Return formation
        return this.prismaService.formation.findUnique({ where: { id: Number(id) } })
    }
}