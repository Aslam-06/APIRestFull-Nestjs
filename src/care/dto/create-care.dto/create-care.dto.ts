import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateCareDto {

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    productId!:number;

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    vetId!:number

}