import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateInvoiceDto {

    @IsInt()
    @Min(1)
    @IsNotEmpty({message:"Order ID is required"})
    orderId!:number;

    @IsInt()
    @Min(1)
    @IsNotEmpty({message:"Client ID is required"})
    clientId!:number
    
}