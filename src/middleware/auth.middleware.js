import jwt from "jsonwebtoken"
import userModel from "../DB/model/user.model.js"
import { asyncHandler } from "../utils/error/error.js"

export const userRoles = {
    user: "User",
    admin: "Admin"
}
export const authentication = () => {
    return asyncHandler(
        async (req, res, next) => {
            const { authorization } = req.headers
            const [bearer, token] = authorization?.split(" ") || []
            if (!bearer || !token) {
                return next(new Error('In-Valid Token Components', { cause: 400 }))
            }
            let signture = undefined
            switch (bearer) {
                case "Bearer":
                    signture = process.env.USER_TOKEN_SIGNTURE
                    break;
                case "Admin":
                    signture = process.env.ADMIN_TOKEN_SIGNTURE
                    break;
                default:
                    break;
            }
            const { id, iat } = jwt.verify(token, signture)
            if (!id) {
                return next(new Error('In-Valid token payload', { cause: 400 }))
            }
            const user = await userModel.findById(id)
            if (!user) {
                return next(new Error('Not a register account', { cause: 404 }))
            }

            if (user.changePasswordTime?.getTime() >= iat * 1000) {
                return next(new Error("In-Vaild Credentials"))
            }


            req.user = user
            return next()
        })
}
export const authorization = (accessRoles = []) => {
    return asyncHandler(
        async (req, res, next) => {
            if (!accessRoles.includes(req.user.role)) {
                return next(new Error('un authorized account', { cause: 403 }))
            }
            return next()
        }
    )
}