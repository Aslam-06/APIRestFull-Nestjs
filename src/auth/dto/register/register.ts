import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class Register {

    @IsString()
    @IsNotEmpty( {message:'Le nom est obligatiore'} )
    nom!:string;

    @IsEmail({},{message:'Email invalide'})
    @IsNotEmpty( {message:"L'email est obligatoire"} )
    email!:string;

    @IsString()
    @Length(5,8,{message:'Le mot de passe est compris entre 5 et 8 caractères'})
    @IsNotEmpty( {message:'Le mot de passe est obligatoire'} )
    password!:string;

    @IsNotEmpty( {message:'Le numero est obligatoire'} )
    @Length(10,10,{message:'Le numero doit faire exactement 10 caractères'})
    numero!:string;

    @IsEnum(Role,{message:'Rôle invalide'})
    @IsOptional()
    role?:Role;

    @IsString()
    @IsOptional()
    profileImageUrl?:string
}

