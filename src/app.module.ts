import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderproductModule } from './orderproduct/orderproduct.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CareModule } from './care/care.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PaymentModule } from './payment/payment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
                isGlobal:true,
            }),PrismaModule, UserModule, ProductModule, OrderModule, OrderproductModule, DeliveryModule, CareModule, AppointmentModule, PaymentModule, PrescriptionModule, InvoiceModule, UploadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
