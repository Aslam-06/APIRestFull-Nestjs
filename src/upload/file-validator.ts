export const fileValidator=(file:Express.Multer.File)=>{
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new Error('Invalide file type. Only JPG/PNG are allowed')
    }
    return true
}