import jwt from "jsonwebtoken"
import { EventEmitter } from "node:events";
import { sendEmail } from "../Email/send.email.js";
import { confirmEmailTemplate } from "../Email/cofirmTemplate/confirmEmail.template.js";
import { customAlphabet } from "nanoid";
import { genrateHashing } from "../security/hash.js";
import userModel from "../../DB/model/user.model.js";

export const emailEvent = new EventEmitter()
emailEvent.on("sendConfirmEmail", async ({ email } = {}) => {
    const otp = customAlphabet("0123456789", 4)()
    const hashOtp = genrateHashing({ plainText: otp })
    await userModel.updateOne({ email }, { confirmEmailOTP: hashOtp })
    const emailToken = jwt.sign({ email }, process.env.Email_TOKEN_SIGNTURE)
    const emailLink = `${process.env.FRONT_LINK}/cofirm-email/${emailToken}`
    const html = confirmEmailTemplate({ code: otp })
    await sendEmail({ to: email, subject: "confirmEmail", html })
})