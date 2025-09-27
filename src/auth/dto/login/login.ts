import { IsEmail, IsString, Length } from "class-validator"

export class Login {

    @IsEmail({},{message:'Email invalide'})
    email!:string

    @IsString()
    @Length(5,8,{message:'Le mot de passe doit être compris entre 5 et 8 caractères'})
    password!:string
}

