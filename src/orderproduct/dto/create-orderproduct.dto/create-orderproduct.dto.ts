import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator"

export class CreateOrderproductDto {
    @IsInt()
    @Min(1)
    @IsPositive( {message:'la quantité est toujours positive'} )
    @IsNotEmpty({message:'la quantité est obligatoire et donc non vide'})
    quantityproduct!:number;

    @IsNumber( {maxDecimalPlaces:2},{message:'le total doit avoir au maximum 2 décimales'} )
    @IsPositive( {message:'la total est toujours positif'} )
    @IsNotEmpty({message:'le total est obligatoire et donc non vide'})
    totalproduct!:number

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    orderId!:number

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    productId!:number
    
}