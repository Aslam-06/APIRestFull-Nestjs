import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Register } from './dto/register/register';
import * as bcrypt from 'bcrypt';
import { Login } from './dto/login/login';


@Injectable()
export class AuthService {
    constructor( 
        private userService:UserService,
        private jwtService:JwtService
    ){}

    private generateToken(user:any){
        const payload = { sub: user.id, email: user.email, role: user.role};
        return this.jwtService.sign(payload);
    }

    async register(registerDto:Register){
        const { password, ...rest} = registerDto;
        const exinstingUser = await this.userService.getUserByEmail(registerDto.email);
        if(exinstingUser){
            throw new ConflictException('Email déjà utilisé');      
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser({
            ...rest,
            password: hashedPassword,
        })
        const token = this.generateToken(user)
        return { user, token };
    }

    async login(loginDto:Login){
        const { email, password } = loginDto;
        const user = await this.userService.getUserByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const token = this.generateToken(user);
        return { user, token };
    }

}
