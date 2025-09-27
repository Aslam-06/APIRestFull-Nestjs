import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCareDto } from './dto/create-care.dto/create-care.dto';

@Injectable()
export class CareService {
    constructor(private prisma:PrismaService) {}

    async createCare(data:CreateCareDto){
        return this.prisma.care.create({
            data:{
                productId:data.productId,
                vetId:data.vetId
            }
        })
    }

    async getCares(){
        return this.prisma.care.findMany({
            include:{
                product:true,
                vet:true
            }
        })
    }

    async getCareById(id:number){
        const care= this.prisma.care.findUnique({
            where:{id}
        })
        if(!care) throw new Error(`Care with id ${id} not found`)
        await this.prisma.care.findUnique({
            where:{id},
            include:{
                product:{
                    select:{
                        id:true,
                        nom:true
                    }
                },
                vet:{
                    select:{
                        id:true,
                        nom:true,
                        email:true,
                        numero:true
                    }
                }

            }
        })
    }
}
