import {diskStorage} from 'multer'

export const multerConfig = {
    storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
            const originalName = file.originalname;
            const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
            const sanitizedBaseName = originalName.substring(0, originalName.lastIndexOf('.')).replace(/\s+/g, '-').toLowerCase();
            cb(null, `${sanitizedBaseName}-${uniqueSuffix}${fileExtension}`);
        }
    }),
    limits:{
        fileSize:5*1024*1024 // 5MB
    }
}