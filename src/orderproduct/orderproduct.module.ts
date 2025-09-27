import { Module } from '@nestjs/common';
import { OrderproductController } from './orderproduct.controller';
import { OrderproductService } from './orderproduct.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderproductController],
  providers: [OrderproductService]
})
export class OrderproductModule {}
