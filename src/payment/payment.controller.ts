import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto/create-payment.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService:PaymentService) {}

    @Post()
    @Roles(Role.CLIENT)
    async createPayment(@Body() createpaymentdto:CreatePaymentDto){
        return this.paymentService.createPayment(createpaymentdto)
    }

    @Get()
    @Roles(Role.CLIENT)
    async getPayments(){
        return this.paymentService.getPayments()
    }

    @Get(':id')
    @Roles(Role.CLIENT)
    async getPaymentById(@Param('id', ParseIntPipe) id:number){
        return this.paymentService.getPaymentById(id)
    }
}
