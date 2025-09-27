import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty( { message:'Le nom ne doit pas être vide' } )
    nom!:string;

    @IsNumber( { maxDecimalPlaces:2 },{ message:'Le prix doit avoir au maximum 2 décimales' } )
    @IsPositive( { message:'le prix est toujours positif' } )
    @IsNotEmpty( { message:'Le prix ne doit pas être vide' } )
    prix!:number;

    @IsString()
    @IsOptional()
    desciption?:string;

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    ownerId!:number
    
}