import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrderproductService } from './orderproduct.service';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto/create-orderproduct.dto';

@Controller('orderproduct')
export class OrderproductController {
    constructor(private readonly orderproductService:OrderproductService){}

    @Post()
    async createOrderProduct(@Body() createorderproductdto:CreateOrderproductDto ){
        return this.orderproductService.createOrderProduct(createorderproductdto)
    }

    @Get()
    async getOrdersProducts(){
        return this.orderproductService.getOrdersProducts()
    }

    @Get(':id')
    async getOrderProductById( @Param('id', ParseIntPipe) id:number ){
        return this.orderproductService.getOrderProductById(id)
    }

    @Delete(':id')
    async deleteOrderProduct( @Param('id', ParseIntPipe) id:number ){
        return this.orderproductService.deleteOrderProduct(id)
    }
}
