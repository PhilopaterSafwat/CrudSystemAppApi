import { Router } from "express";
import * as porductServices from "./services/product.service.js"
import { fileValidations, uploadCloudFile } from "../../utils/multer/cloud.multer.js";
import { authentication } from "../../middleware/auth.middleware.js";
const router = Router()
router.get("/",
    authentication(),
    porductServices.all
)
router.post("/add",
    authentication(),
    uploadCloudFile(fileValidations.image).single("attachment"),
    porductServices.addProduct
)
router.delete("/delete/:id",
    authentication(),
    porductServices.Deleteproduct
)
router.patch("/update/:id",
    authentication(),
    uploadCloudFile(fileValidations.image).single("attachment"),
    porductServices.UpdateProduct
)
export default router