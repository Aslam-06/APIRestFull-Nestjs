import { Injectable } from '@nestjs/common';
import { LocalAdapter } from './local.adapter';
import { fileValidator } from './file-validator';
import { proccessImage } from './image.processor';

@Injectable()
export class UploadService {
    private adapter = new LocalAdapter()

    async uploadfile(file:Express.Multer.File) {
        fileValidator(file)
        if (file.mimetype.startsWith('/image')){

            await proccessImage(file.path)
        }
        return this.adapter.save(file)
    }
}
