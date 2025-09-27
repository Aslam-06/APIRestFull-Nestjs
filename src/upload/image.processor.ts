import sharp from "sharp"

export const proccessImage = async (filePath:string) =>{
    await sharp(filePath)
    .resize(800)
    .toFile(filePath.replace(/(\.\w+)$/,'resized$1'))
}