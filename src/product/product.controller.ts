import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('product')

@UseGuards(JwtGuard,RolesGuard)
export class ProductController {
    constructor( private readonly productService:ProductService ) {}

    @Post()
    @Roles(Role.ELEVEUR)
    async createProduct( @Body() createProductDto:CreateProductDto ){
        return this.productService.createProduct(createProductDto)
    }

    @Get()
    @Roles(Role.ELEVEUR, Role.CLIENT,Role.ADMIN)
    async getProducts(){
        return this.productService.getProducts()
    }

    @Get('nom/:nom')
    @Roles(Role.ELEVEUR, Role.CLIENT,Role.ADMIN)
    async getProducByName( @Param('nom') nom:string ){
        return this.productService.getProductByName(nom)
    }

    @Patch(':id')
    @Roles(Role.ELEVEUR)
    async updateProduct( @Param('id', ParseIntPipe) id:number, @Body() updateProductDto:UpdateProductDto ){
        return this.productService.updateProduct(id,updateProductDto)
    }

    @Delete(':id')
    @Roles(Role.ELEVEUR)
    async deleteProduct( @Param('id', ParseIntPipe) id:number){
        return this.productService.deleteProduct(id)
    }

}
