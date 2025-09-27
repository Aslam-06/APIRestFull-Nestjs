import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(private prisma:PrismaService) {}

    async createPayment(data:CreatePaymentDto){
        return this.prisma.payment.create({data})
    }

    async getPayments(){
        return this.prisma.payment.findMany()
    }

    async getPaymentById(id:number){
        const payment= this.prisma.payment.findUnique({
            where:{id}
        })
        if(!payment) throw new Error(`Payment with id ${id} not found`)
        return payment
    }
}
