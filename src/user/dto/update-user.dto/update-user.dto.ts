import { IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class UpdateUserDto {
        @IsString()
        @IsOptional()
        nom?: string;
    
        @IsEmail({},{message:'Email invalide'})
        @IsOptional()
        email?:string;
    
        @IsString()
        @MinLength(5,{message:'Le mot de passe doit faire au moins 5 caractéres '})
        @MaxLength(8,{message:'Le mot de passe doit faire au maximum 8 caractères '})
        @IsOptional()
        password?:string;
    
        @IsString()
        @Length(10,10, {message:'Le numero doit faire exactement 10 caractères'})
        @IsOptional()
        numero?:string;
    
        @IsEnum(Role,{message:`Le role doit être parmi ${Object.values(Role)}`})
        @IsOptional()
        role?:string;

        @IsString()
        @IsOptional()
        profileImageUrl?:string;

}
