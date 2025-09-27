import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('order')
@UseGuards(JwtGuard,RolesGuard)
export class OrderController {
    constructor(private readonly orderService:OrderService) {}
    
    @Post()
    @Roles(Role.CLIENT)
    async createOrder( @Body() createOrderDto:CreateOrderDto ){
        return this.orderService.createOrder(createOrderDto)
    }

    @Get()
    @Roles(Role.CLIENT,Role.ELEVEUR)   
    async getOrders(){
        return this.orderService.getOrders()
    }

    @Get(':id')
    @Roles(Role.CLIENT,Role.ELEVEUR)
    async getOrderById( @Param('id', ParseIntPipe) id:number ){
        return this.orderService.getOrdersById(id)
    }
}
