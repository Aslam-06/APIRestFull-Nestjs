import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto/create-delivery.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('delivery')
@UseGuards(JwtGuard,RolesGuard)
export class DeliveryController {
    constructor(private readonly deliveryService:DeliveryService) {}

    @Post()
    @Roles(Role.CLIENT)
    async createDelivery(@Body() createDeliveryDto:CreateDeliveryDto){
        return this.deliveryService.createDelivery(createDeliveryDto)
    }

    @Get()
    @Roles(Role.CLIENT,Role.LIVREUR)
    async getDeliveriries(){
        return this.deliveryService.getDeliveries()
    }

    @Get(':id')
    @Roles(Role.CLIENT,Role.LIVREUR)
    async getDeliveryById(@Param('id', ParseIntPipe) id:number ){
        return this.deliveryService.getDeliveryById(id)
    }
}
