import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator"
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty( {message:'Le nom est obligatiore'} )
    nom!: string;

    @IsEmail({},{message:'Email invalide'})
    @IsString()
    @IsNotEmpty( {message:"L'email est obligatiore"} )
    email!:string;

    @IsString()
    @MinLength(5,{message:'Le mot de passe doit faire au moins 5 caractéres '})
    @MaxLength(8,{message:'Le mot de passe doit faire au maximum 8 caractères '})
    @IsNotEmpty( {message:'Le mot de passe est obligatiore'} )
    password!:string;

    @IsString()
    @Length(10,10, {message:'Le numero doit faire exactement 10 caractères'})
    @IsNotEmpty( {message:'Le numero est obligatiore'} )
    numero!:string;

    @IsEnum(Role,{message:`Le role doit être parmi ${Object.values(Role)}`})
    @IsOptional()
    role?:string;
    
    @IsString()
    @IsOptional()
    profileImageUrl?:string;
}
