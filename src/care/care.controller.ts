import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CareService } from './care.service';
import { CreateCareDto } from './dto/create-care.dto/create-care.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('care')
@UseGuards(JwtGuard,RolesGuard)
export class CareController {
    constructor(private readonly careService:CareService) {}

    @Post()
    @Roles(Role.VETERINAIRE)
    async createCare(@Body() createcaredto:CreateCareDto){
        return this.careService.createCare(createcaredto)
    }

    @Get()
    @Roles(Role.ELEVEUR,Role.CLIENT,Role.VETERINAIRE)
    async getCares(){
        return this.careService.getCares()
    }

    @Get(':id')
    @Roles(Role.ELEVEUR,Role.CLIENT,Role.VETERINAIRE)
    async getCareById(@Param('id', ParseIntPipe) id:number ){
        return this.careService.getCareById(id)
    }
}
