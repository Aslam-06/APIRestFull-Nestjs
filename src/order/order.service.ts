import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(private prisma:PrismaService) {}

    async createOrder(data:CreateOrderDto){
        return this.prisma.order.create({
            data:{
                quantity:data.quantity,
                receiver:{connect:{id:data.receiverId}},
                total:data.total
            }
        })
    }

    async getOrders(){
        return this.prisma.order.findMany({
            include:{
                invoices:true,
                ordersproducts:true
            }
        })
    }

    async getOrdersById( id:number ) {
        return this.prisma.order.findUnique({
            where:{id},
            include:{
                ordersproducts:{
                    select:{
                        id:true,
                        quantityproduct:true,
                        totalproduct:true
                    }
                },
                invoices:{
                    select:{
                        id:true,
                        order:true,
                        client:true
                    }
                }
            }
        })
    }

}
