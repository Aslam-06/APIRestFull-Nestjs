import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateOrderDto {
    @IsInt()
    @Min(1)
    @IsPositive({ message:'La quantité est toujours positif' })
    @IsNotEmpty({message:'La quantié est obligatoire et donc non vide'})
    quantity!:number

    @IsNumber({ maxDecimalPlaces:2 },{ message:'Le total doit avoir au maximum 2 décimales' })
    @IsPositive({ message:'La quantité est toujours positif' })
    @IsNotEmpty({message:'Le total est obligatoire et donc non vide'})
    total!:number

    @IsString()
    @IsNotEmpty({message:'Le statut est obligatoire et donc non vide'})
    receiver!:string

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    receiverId!:number

    
}