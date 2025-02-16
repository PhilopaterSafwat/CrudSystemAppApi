import { Router } from "express";
import * as registerationServices from "./services/registeration.service.js"
import { valdation } from "../../middleware/valdation.middelware.js";
import * as validetor from "./auth.validatioon.js";

const router = Router()


router.post("/signup", valdation(validetor.signUPValdationSchema), registerationServices.signup)
router.post("/login", valdation(validetor.loginSchema), registerationServices.login)
router.patch("/confirm-email", registerationServices.confirmEmail)

export default router