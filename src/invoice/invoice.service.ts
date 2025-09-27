import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto/create-invoice.dto';
import PDFDocument from 'pdfkit';
import { resolve } from 'path';
import nodemailer from 'nodemailer'
import { from, Subject } from 'rxjs';
import { text } from 'stream/consumers';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class InvoiceService {
    constructor(
        private configService:ConfigService,
        private prisma:PrismaService
    ) {}

    async createInvoice(createinvoicedto:CreateInvoiceDto){
        const invoice = await this.prisma.invoice.create({
            data:{
                orderId:createinvoicedto.orderId,
                clientId:createinvoicedto.clientId
            }
        })

        const order = await this.prisma.order.findUnique({
            where:{id:createinvoicedto.orderId}
        })

        const client = await this.prisma.user.findUnique({
            where:{id:createinvoicedto.clientId}
        })

        if (!order || !client){
            throw new Error('Commande ou Client Introuvable')
        }

        const doc = new PDFDocument()
        const buffers: Uint8Array[]=[]
        doc.on('data', (chunk)=>buffers.push(chunk))

        doc.fontSize(16).text('Facture ElevagePlus',{align:'center'})
        doc.moveDown()
        doc.fontSize(12).text(`${client.nom}`)
        doc.text(`Date :${invoice.createdAt.toLocaleDateString().split('T')[0]}`)
        doc.text(`ID: ${invoice.id}`)
        doc.end()

        await new Promise<void>((resolve) =>{
            doc.on('end',resolve)
        })

        const pdfBuffer =Buffer.concat(buffers)

        const host = this.configService.get<string>('SMTP_HOST')
        const port = this.configService.get<number>('SMTP_PORT')
        const user = this.configService.get<string>('SMTP_USER')
        const pass = this.configService.get<string>('SMTP_PASS')

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure:false,
            auth:{
                user,
                pass
            }
        })

        await transporter.sendMail({
            from:`"ElevagePlus" <${user}>`,
            to:client.email,
            subject:'Votre facture ElevagePlus',
            text:`Bonjour ${client.nom},\n\nVoici votre facture`,
            attachments:[
                {
                    filename:`facture_${invoice.id}.pdf`,
                    content:pdfBuffer
                }
            ]
        })
        return invoice
    }

    async getInvoices(){
        return this.prisma.invoice.findMany({
            include:{
                order:true,
                client:true
            }
        })
    }

    async getInvoiceById(id:number){
        const invoice= this.prisma.invoice.findUnique({
            where:{id},
            include:{
                order:{
                    select:{
                        quantity:true,
                        total:true
                    }
                },
                client:{
                    select:{
                        id:true,
                        nom:true, 
                        email:true,
                        numero:true
                    }
                }
            }
        })

        if(!invoice){
            throw new NotFoundException(`Invoice ${id} introuvable`)
        }
        if(!invoice.client){
            throw new NotFoundException(`Client ${id} introuvable`)
        }
            const client = invoice.client
        if(!invoice.order){ 
            throw new NotFoundException(`Order ${id} introuvable`)
        }
            const order = invoice.order
        return invoice
    }
}
