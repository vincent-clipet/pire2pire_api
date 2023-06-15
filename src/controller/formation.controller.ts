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
    Formation as FormationModel,
    Module as ModuleModel
} from "@prisma/client"

@Controller()
export class FormationController{
    constructor(private readonly prismaService: PrismaService){}
    @Get("formation/:id")
    async getFormationById(@Param("id") id:string): Promise<FormationModel>{
        return this.prismaService.formation.findUnique({where:{id:Number(id)}})
    }

    @Get("formations")
    async getAllFormation(): Promise<FormationModel[]>{
        return this.prismaService.formation.findMany()
    }

    @Post("formation/create")
    async formationCreate(
        @Body() formationData: {
            name: string,
            module: ModuleModel[]
        }
    ): Promise<FormationModel>{
        const formation = this.prismaService.formation.create({
            data:{
                name: formationData.name
            }
        });

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
        const relation = await this.prismaService.formationModule.findMany({
            where: {formationId: Number(id)}
        })
        
        for(let i=0;i<relation.length;i++){
            this.prismaService.formationModule.delete({
                where: {id: Number(relation[i].id)}
            })
        }

        return this.prismaService.formation.delete({
            where: {id:Number(id)}
        })
    }

    @Put("formation/:id/update")
    async formationUpdate(
        @Param("id") id:string,
        @Body() formationData: {
            name?: string,
            addModule?: ModuleModel[],
            delModule?: ModuleModel[]
        }
    ): Promise<ModuleModel>{
        for(let i=0;i<formationData.addModule.length;i++){
            this.prismaService.formationModule.create({
                data:{
                    formationId: Number(id),
                    moduleId: formationData.addModule[i].id
                }
            });
        }

        for(let i=0;i<formationData.delModule.length;i++){
            const relation = await this.prismaService.formationModule.findFirst({
                where: {
                    formationId: Number(id),
                    moduleId: formationData.delModule[i].id
                }
            });

            this.prismaService.formationModule.delete({
                where: {id: relation.id}
            })
        }

        return formationData.name === undefined ?
        null :
        this.prismaService.module.update({
            where: {
                id: Number(id)
            },
            data: {
                name: formationData.name
            }
        })
    }
}