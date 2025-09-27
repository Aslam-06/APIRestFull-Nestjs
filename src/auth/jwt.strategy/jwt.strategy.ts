import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService:ConfigService){
        const jwrSecret=configService.get<string>('JWT_SECRET');
        if(!jwrSecret){
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwrSecret
        });
    }

    async validate(payload:any){
        if(!payload?.sub || !payload?.email || !payload?.role){
            throw new UnauthorizedException('Invalid token payload');
        }
        return {id:payload.sub,email:payload.email,role:payload.role};
    }
}
