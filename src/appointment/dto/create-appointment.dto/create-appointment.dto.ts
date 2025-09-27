import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateAppointmentDto {

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    vetId!:number;

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    ownerId!:number;

    @IsInt()
    @IsPositive( {message:"l'id est positif"} )
    @IsNotEmpty({message:"l'id est obligatoire"})
    productId!:number


}
