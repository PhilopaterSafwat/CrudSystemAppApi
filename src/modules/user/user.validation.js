import Joi from "joi";
import { genralValidation } from "../../middleware/valdation.middelware.js";
export const shareProfileValidation = Joi.object().keys({
    userId: genralValidation.userId.required(),
    "accept-language": genralValidation["accept-language"]
}).required()
export const updateProfile = Joi.object().keys({
    userName: genralValidation.userName,
    phone: genralValidation.phone
}).required()
export const updateNewPassword = Joi.object().keys({
    oldPassword: genralValidation.password.required(),
    newPassword: genralValidation.password.not(Joi.ref("oldPassword")).required(),
    confirmPassword: genralValidation.password.valid(Joi.ref("newPassword")).required()
}).required()