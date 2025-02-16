
import mongoose, { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        secure_url: String,
        public_id: String
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isDeleted: { type: Boolean, default: false }
    ,
    recipientId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const productModel = mongoose.models.product || model("product", productSchema)

export default productModel;