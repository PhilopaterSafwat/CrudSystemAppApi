import Joi from "joi";
import { genralValidation } from "../../middleware/valdation.middelware.js";


export const signUPValdationSchema = Joi.object().keys({

    email: genralValidation.email.required(),
    userName: genralValidation.userName.required(),
    password: genralValidation.password.required(),
    confirmationPassword: genralValidation.confirmationPassword.required(),
    phone: genralValidation.phone,
    "accept-language": genralValidation["accept-language"]

}).required()

export const loginSchema = Joi.object().keys({

    email: genralValidation.email.required(),
    password: genralValidation.password.required(),
    "accept-language": genralValidation["accept-language"]

}).required()
export const confirmEmail = Joi.object().keys({

    email: genralValidation.email.required(),
    code: genralValidation.code.required(),
    "accept-language": genralValidation["accept-language"]

}).required()
