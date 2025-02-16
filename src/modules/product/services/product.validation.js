import Joi from "joi";
import { genralValidation } from "../../middleware/valdation.middelware.js";

export const AddAndUpdateProduct = Joi.object().keys({
    Name: genralValidation.productName.required(),
    Price: genralValidation.productPrice.required(),
    Category: genralValidation.productCategory.required(),
    Quantity: genralValidation.productQuantity.required()
}).required()
export const updateNewPassword = Joi.object().keys({
    oldPassword: genralValidation.password.required(),
    newPassword: genralValidation.password.not(Joi.ref("oldPassword")).required(),
    confirmPassword: genralValidation.password.valid(Joi.ref("newPassword")).required()
}).required()