import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor( private prisma:PrismaService ) {}

    async createProduct(data:CreateProductDto) {
        return this.prisma.product.create({data})
    }

    async getProducts() {
        return this.prisma.product.findMany({
            include:{
                owner:true,
                cares:true,
                ordersproducts:true,
                appointments:true,
            }
        })
    }

    async getProductByName (nom:string) {
        const product=await this.prisma.product.findFirst({
            where:{nom},
            include:{
                ordersproducts:{
                    select:{
                        id:true,
                        quantityproduct:true,
                        totalproduct:true
                    }
                }
            }
        })
        if(!product) {
            throw new Error(`Le Produit ${nom} n'existe pas`)
        }
        return product
    }

    async updateProduct(id:number,data:UpdateProductDto){
        const product=await this.prisma.product.findUnique({where:{id}})
        if(!product) { 
            throw new Error(`Le Produit d'id ${id} n'existe pas`)
        }   
        return await this.prisma.product.update({
            where:{id},
            data
        })
    }

    async deleteProduct(id:number){
        const product=await this.prisma.product.findUnique({where:{id}})
        if(!product) { 
            throw new Error(`Le Produit d'id ${id} n'existe pas`)
        }   
        return await this.prisma.product.delete({
            where:{id}
        })
    }
}
