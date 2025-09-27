import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto/create-orderproduct.dto';

@Injectable()
export class OrderproductService {
    constructor(private prisma:PrismaService) {}

    async createOrderProduct(data:CreateOrderproductDto){
        return this.prisma.orderProduct.create({
            data:{
                quantityproduct:data.quantityproduct,
                totalproduct:data.totalproduct,
                order:{connect:{id:data.orderId}},
                product:{connect:{id:data.productId}}
            }
        })
    }

    async getOrdersProducts(){
        return this.prisma.orderProduct.findMany({
            include:{
                order:true,
                product:true
            }
        })
    }

    async getOrderProductById(id:number){
        return this.prisma.orderProduct.findUnique({
            where:{id},
            include:{
                order:{
                    select:{
                        id:true,
                        quantity:true,
                        total:true
                    }
                },
                product:{
                    select:{
                        id:true,
                        nom:true,
                        prix:true
                    }
                }
            }
        })
    }

    async deleteOrderProduct(id:number){
        const deleteOrderProduct= this.prisma.orderProduct.findUnique({
            where:{id}
        })
        if(!deleteOrderProduct) throw new NotFoundException(`OrderProduct ${id} non trouvé `)
        return await this.prisma.orderProduct.delete({
            where:{id}
        })
    }

}
