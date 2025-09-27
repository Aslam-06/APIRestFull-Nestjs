import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(private prisma:PrismaService) {}

    async createAppointment(data:CreateAppointmentDto){
        return this.prisma.appointment.create({
            data:{
                vetId:data.vetId,
                ownerId:data.ownerId,
                productId:data.productId
            }
        })
    }

    async getAppointements(){
        return this.prisma.appointment.findMany({
            include:{
                vet:true,
                owner:true,
                product:true
            }
        })
    }

    async getApppointmentById(id:number){
        return this.prisma.appointment.findUnique({
            where:{id},
            include:{
                vet:{
                    select:{
                        id:true,
                        nom:true,
                        email:true,
                        numero:true
                    }
                },
                owner:{
                    select:{
                        id:true,
                        nom:true,
                        email:true,
                        numero:true
                    }
                },
                product:{
                    select:{
                        id:true,
                        nom:true
                    }
                }
            }
        })
    }
}
