
import userModel from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successRes } from "../../../utils/response/success.response.js";
import { genrateEncryption } from "../../../utils/security/encryption.js";
import { compareHashing, genrateHashing } from "../../../utils/security/hash.js";

export const FindAll = asyncHandler(
    async (req, res, next) => {
        const messages = (await messageModel.find({ recipientId: req.user._id }))
        return successRes({ res, data: { user: req.user, messages } })
    })
export const shareProfile = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
        return user ? successRes({ res, data: { user } }) : next(new Error("In-Valid EmailId", { cause: 404 }))
    })
export const shareProfileByToken = asyncHandler(
    async (req, res, next) => {
        const user  = req.user;
        return user ? successRes({ res, data: { user } }) : next(new Error("ShareProfileByToken", { cause: 404 }))
    })
export const updateProfile = asyncHandler(
    async (req, res, next) => {
        if (req.body.phone) {
            const encryptPhone = genrateEncryption(req.body.phone, process.env.PHONE_SIGNTURE)
            req.body.phone = encryptPhone
        }
        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
        return successRes({ res, data: { user } })
    })
export const updateNewPassword = asyncHandler(
    async (req, res, next) => {
        if (!compareHashing({ plainText: req.body.oldPassword, hashingValue: req.user.password })) {
            return next(new Error("in-valid old password", { cause: 409 }))
        }
        const hashingPassword = genrateHashing({ plainText: req.body.newPassword })
        const user = await userModel.findByIdAndUpdate(req.user._id, { password: hashingPassword, changePasswordTime: Date.now() }, { new: true, runValidators: true })
        return successRes({ res, data: { user } })
    })

export const freezeAccount = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true, changePasswordTime: Date.now() }, { new: true, runValidators: true })
        return successRes({ res, data: { user } })
    })

