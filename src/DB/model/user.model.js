import mongoose, { model, Schema } from "mongoose";
import { userRoles } from "../../middleware/auth.middleware.js";

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "UserName is required"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmEmailOTP: String,
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    phone: String,
    DOB: Date,
    address: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: "User"
    },
    changePasswordTime: Date,
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

const userModel = mongoose.models.User || model("User", userSchema)

export default userModel