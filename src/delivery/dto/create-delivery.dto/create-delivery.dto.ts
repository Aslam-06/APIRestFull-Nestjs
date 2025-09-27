import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateDeliveryDto {
    
    @IsInt()
    @IsPositive( {message:" l'id est positif "} )
    @IsNotEmpty( {message:" l'id est obligatoire "} )
    orderId!:number;

    @IsInt()
    @IsPositive( {message:" l'id est positif "} )
    @IsNotEmpty( {message:" l'id est obligatoire "} )
    driverId!:number
    
}
