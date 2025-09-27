import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file',multerConfig))
    async upload(@UploadedFile() file:Express.Multer.File){
        const filePath=await this.uploadService.uploadfile(file)
        return { url:filePath }
    }

}
