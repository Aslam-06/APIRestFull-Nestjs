import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreatePrescriptionDto {

    @IsInt()
    @Min(1)
    @IsNotEmpty({message:"L'id du vétérinaire est obligatiore"})
    vetId!:number;

    @IsInt()
    @Min(1)
    @IsNotEmpty({message:"L'id du propriétaire est obligatiore"})
    ownerId!:number

}
