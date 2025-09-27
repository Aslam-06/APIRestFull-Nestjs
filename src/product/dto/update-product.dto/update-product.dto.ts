import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {
        @IsString()
        @IsOptional()
        nom?:string;
    
        @IsNumber( { maxDecimalPlaces:2 },{ message:'Le prix doit avoir au maximum 2 décimales' } )
        @IsPositive( {message:"le prix est toujours positif"} )
        @IsOptional()
        prix?:number;
    
        @IsString()
        @IsOptional()
        desciption?:string;
}
