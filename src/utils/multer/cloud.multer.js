import multer from "multer"
export const fileValidations = {
    image: ["image/jpeg", "image/png", "image/gif"],
}
export const uploadCloudFile = (fileValidations = []) => {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (fileValidations.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb("In-Valid file format", false)
        }
    }
    return multer({ det: "tempPath", fileFilter, storage })
}