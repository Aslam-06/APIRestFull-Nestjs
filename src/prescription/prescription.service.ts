import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto/create-prescription.dto';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { Buffer } from 'buffer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrescriptionService {
  constructor(
    private configService:ConfigService,
    private prisma: PrismaService
  ) {}

  async createPrescription(dto: CreatePrescriptionDto) {
    // 1️⃣ Créer l'ordonnance dans la base de données
    const prescription = await this.prisma.prescription.create({
      data: {
        vetId: dto.vetId,
        ownerId: dto.ownerId,
      },
    });

    // 2️⃣ Récupérer les infos du vétérinaire
    const vet = await this.prisma.user.findUnique({
      where: { id: dto.vetId },
    });

    // 3️⃣ Récupérer les infos du propriétaire
    const owner = await this.prisma.user.findUnique({
      where: { id: dto.ownerId },
    });

    if (!vet || !owner) {
      throw new Error('Vétérinaire ou propriétaire introuvable');
    }

    // 4️⃣ Générer le PDF de l'ordonnance
    const doc = new PDFDocument();
    const buffers: Uint8Array[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));

    doc.fontSize(16).text('Ordonnance ElevagePlus', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`${owner.nom}`);
    doc.text(`Dr : ${vet.nom}`);
    doc.text(`Date : ${prescription.createdAt.toLocaleDateString().split('T')[0]}`);
    doc.text(` ID : ${prescription.id}`);
    doc.end();

    // On attend la fin du PDF avant de continuer
    await new Promise<void>((resolve) => {
      doc.on('end', resolve);
    });

    const pdfBuffer = Buffer.concat(buffers);

    const host=this.configService.get<string>('STMP_HOST')
    const port=this.configService.get<number>('STMP_PORT')
    const user=this.configService.get<string>('STMP_USER')
    const pass=this.configService.get<string>('STMP_PASS')

    // 5️⃣ Configurer le transporteur SMTP pour envoyer l'email
    const transporter = nodemailer.createTransport({
      host, // ex: 'smtp.gmail.com'
      port,
      secure: false, // true si port 465
      auth: {
        user, // ton email
        pass, // mot de passe ou mot de passe "App"
      },
    });

    // 6️⃣ Envoyer l'email avec le PDF en pièce jointe
    await transporter.sendMail({
      from: `"ElevagePlus" <${user}>`,
      to: owner.email,
      subject: 'Votre ordonnance ElevagePlus',
      text:` Bonjour ${owner.nom},\n\nVoici votre ordonnance .`,
      attachments: [
        {
          filename: `ordonnance_${prescription.id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    // 7️⃣ Retourner l'objet prescription créé
    return prescription;
  }

  async getPrescriptions(){
    return this.prisma.prescription.findMany({
        include:{
            vet:true,
            owner:true
        }
    })
  }

  async getPrescriptionById(id:number){
     const prescription = await this.prisma.prescription.findUnique({
        where:{id},
        include:{
            vet:{
                select:{
                    nom:true,
                    email:true,
                    numero:true
                }
            },
            owner:{
                select:{
                    nom:true,
                    email:true,
                    numero:true
                }
            }
        }

    })

    if(!prescription ){
        throw new NotFoundException(`Prescription ${id} introuvable`)
    }
    return prescription
  }
}