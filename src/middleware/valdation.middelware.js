
import Joi from "joi"
import { Types } from "mongoose"


export const validateObjectId = (value, helper) => {

    return Types.ObjectId.isValid(value) ? true : helper.message("In-Valid ObjectId")
}
export const genralValidation = {
    email: Joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ["com", "net", "edu"] } }),
    userName: Joi.string().alphanum().case("upper").min(2).max(20),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
    confirmationPassword: Joi.string().valid(Joi.ref("password")),
    phone: Joi.string().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)),
    userId: Joi.string().custom(validateObjectId),
    productName: Joi.string(),
    productPrice: Joi.number(),
    productCategory: Joi.string(),
    productQuantity: Joi.number(),
    code: Joi.string().pattern(new RegExp(/^\d{4}$/)),
    "accept-language": Joi.string().valid("en", "ar")
}
export const valdation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.query, ...req.params }
        if (req.headers["accept-language"]) {
            inputData["accept-language"] = req.headers["accept-language"]
        }
        const valdationResult = schema.validate(inputData, { abortEarly: false })
        if (valdationResult.error) {
            return res.status(400).json(valdationResult.error.details)
        }
        return next()
    }
} 