import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
@UseGuards(JwtGuard,RolesGuard)
export class UserController {
    constructor( private readonly userService:UserService ) {}

    @Post()
    @Roles(Role.ADMIN)
    async createuser( @Body() createUserDto:CreateUserDto ) {
        return this.userService.createUser(createUserDto)
    }

    @Get()
    @Roles(Role.ADMIN)
    async getUers() {
        return this.userService.getUsers()
    }

    @Get('email/:email')
    @Roles(Role.ADMIN)  
    async getUserByEmail( @Param('email') email:string ) {
        return this.userService.getUserByEmail(email)
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    async updateUser( @Param('id', ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto ){
        return this.userService.updateuser(id,updateUserDto)
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteUser( @Param('id', ParseIntPipe) id:number ) {
        return this.userService.deleteuser(id)
    }

}
