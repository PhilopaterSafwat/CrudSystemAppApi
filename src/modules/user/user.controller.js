import { Router } from "express";
import * as UserServices from "./services/user.service.js"
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import { endpoint } from "./user.endpoint.js";
import { valdation } from "../../middleware/valdation.middelware.js";
import { updateNewPassword, updateProfile, shareProfileValidation } from "./user.validation.js";

const router = Router()

router.get("/profile",
    authentication(),
    authorization(endpoint.profile),
    UserServices.FindAll)

// router.get("/profile/:userId",
//     valdation(shareProfileValidation),
//     UserServices.shareProfile)

router.get("/profile/token",
    authentication(),
    UserServices.shareProfileByToken)

router.patch("/updateProfile",
    valdation(updateProfile),
    authentication(),
    authorization(endpoint.profile),
    UserServices.updateProfile)

router.patch("/updateNewPassword",
    valdation(updateNewPassword),
    authentication(),
    authorization(endpoint.profile),
    UserServices.updateNewPassword)
router.delete("/freezeAccount",
    authentication(),
    authorization(endpoint.profile),
    UserServices.freezeAccount)

export default router