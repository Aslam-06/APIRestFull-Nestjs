import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('appointment')
@UseGuards(JwtGuard,RolesGuard)
export class AppointmentController {
    constructor(private readonly appointementService:AppointmentService) {}

    @Post()
    @Roles(Role.VETERINAIRE)
    async createAppointment(@Body() createappointmentdto:CreateAppointmentDto){
        return this.appointementService.createAppointment(createappointmentdto)
    }

    @Get()
    @Roles(Role.VETERINAIRE,Role.CLIENT,Role.ELEVEUR)
    async getAppointments(){
        return this.appointementService.getAppointements()
    }

    @Get(':id')
    @Roles(Role.VETERINAIRE,Role.CLIENT,Role.ELEVEUR)
    async getAppointmentById(@Param('id', ParseIntPipe) id:number){
        return this.appointementService.getApppointmentById(id)
    }
}
