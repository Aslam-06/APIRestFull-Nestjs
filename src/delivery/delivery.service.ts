import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
    constructor(private prisma:PrismaService) {}

    async createDelivery(data:CreateDeliveryDto){
        return this.prisma.delivery.create({
            data:{
                orderId:data.orderId,
                driverId:data.driverId
            }
        })
    }

    async getDeliveries(){
        return this.prisma.delivery.findMany({
            include:{
                order:true,
                driver:true
            }
        })
    }

    async getDeliveryById(id:number){
        return this.prisma.delivery.findUnique({
            where:{id},
            include:{
                order:{
                    select:{
                        id:true,
                        quantity:true,
                        total:true
                    }
                },
                driver:{
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
