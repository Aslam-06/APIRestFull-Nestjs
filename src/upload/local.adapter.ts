import { unlinkSync } from "fs"


export class LocalAdapter {
    save(file:Express.Multer.File){
        return `/uploads/${file.filename}`
    }
    delete(filePath:string){
        unlinkSync(`.${filePath}`)
    }
}