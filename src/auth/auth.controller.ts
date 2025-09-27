import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './dto/register/register';
import { Login } from './dto/login/login';



@Controller('auth')

export class AuthController {
    constructor(private readonly authService:AuthService ){}


    @Post('register')
        async register(@Body() registerDto:Register){
        return this.authService.register(registerDto);
    }
    @Post('login')
        async login(@Body() loginDto:Login){
        return this.authService.login(loginDto);
    }
}
