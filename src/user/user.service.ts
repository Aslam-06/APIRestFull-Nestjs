import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService) {}

    async createUser(data:CreateUserDto){
        const hashedPassword = await bcrypt.hash(data.password,10)
        return this.prisma.user.create({
            data:{
                ...data,
                password:hashedPassword
            }
        })
    }

    async  getUsers () {
        return this.prisma.user.findMany({
            include:{
                deliveries:true,
                cares:true,
                prescriptions:true,
                orders:true,
                products:true,
                invoices:true
            }
        })
    }

    async getUserByEmail (email:string)  {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include:{
                orders:{
                    select:{
                        id:true, 
                        quantity:true,
                        total:true,
                        receiverId:true
                    }
                },
                products:{
                    select:{
                        id:true,
                        nom:true, 
                        prix:true
                    }
                }
            }
        })
        return user;

    }

    async updateuser (id:number,data:UpdateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where:{id}
         })
        if(!existingUser) {
            throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
        }   
        let  hashedPassword:string | undefined=undefined
        if (data.password){
            hashedPassword=await bcrypt.hash(data.password,10)
        }
        return await this.prisma.user.update({
            where:{id},
            data:{
                ...data,
                password:hashedPassword ?? existingUser.password
            }
        });
    }

    async deleteuser (id:number) {
        const existingUser = await this.prisma.user.findUnique({
            where:{id} })
        if(!existingUser) {
            throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
        }
        return await this.prisma.user.delete({
            where:{id}
        })
    }
}