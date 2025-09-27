import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsString()
    @IsNotEmpty({message:"Payer name is required"})
    payerName!:string;

    @IsString()
    @IsNotEmpty({message:"Receiver name is required"})
    receiverName!:string;

    @IsString()
    @IsNotEmpty({message:"Receiver number is required"})
    receiverNumber!:string;

    @IsString()
    @IsNotEmpty({message:"Reason is required"})
    reason!:string;

    
    @IsNumber( {maxDecimalPlaces:2},{message:'le montant doit avoir au maximum 2 décimales'} )
    @IsPositive( {message:'la total est toujours positif'} )
    @IsNotEmpty({message:"Amount is required"})
    amount!:number

}