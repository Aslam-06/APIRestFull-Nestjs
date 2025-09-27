import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto/create-invoice.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('invoice')
@UseGuards(JwtGuard,RolesGuard)
export class InvoiceController {
    constructor( private readonly invoiceService:InvoiceService ){}

    @Post()
    @Roles(Role.CLIENT,Role.ADMIN)
    async createInvoice(@Body() createinvoicedto:CreateInvoiceDto ){
        try {
            const result= await this.invoiceService.createInvoice(createinvoicedto)
            return {
                message:'Facture crée avec succès',
                data:result
            }   
        } catch (error:any) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    @Roles(Role.CLIENT,Role.ADMIN)
    async getInvoices(){
        return this.invoiceService.getInvoices()
    }

    @Get(':id')
    @Roles(Role.CLIENT)
    async getInvoiceById(@Param('id', ParseIntPipe) id:number){
        return this.invoiceService.getInvoiceById(id)
    }
}
