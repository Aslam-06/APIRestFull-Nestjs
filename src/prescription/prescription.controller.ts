import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto/create-prescription.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('prescription')
@UseGuards(JwtGuard,RolesGuard)
export class PrescriptionController {
    constructor( private readonly prescriptionService:PrescriptionService ) {}

    @Post()
    @Roles(Role.VETERINAIRE)
    async createPrescription(@Body() dto:CreatePrescriptionDto){
        try{
            const result = await this.prescriptionService.createPrescription(dto)
            return{
                message:'Ordonnance crée avec succès',
                data:result
            }
        }catch(error:any){
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    @Roles(Role.VETERINAIRE, Role.CLIENT,Role.ADMIN)
    async getPrescriptions(){
        return this.prescriptionService.getPrescriptions()
    }

    @Get(':id')
    @Roles(Role.VETERINAIRE, Role.CLIENT,Role.ADMIN)
    async getPrescriptionById(@Param('id', ParseIntPipe) id:number){
        return this.prescriptionService.getPrescriptionById(id)
    }
}
