import productModel from "../../../DB/model/product.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { cloud } from "../../../utils/multer/cloudinary.multer.js";
import { successRes } from "../../../utils/response/success.response.js";

export const all = asyncHandler(
    async (req, res, next) => {
        const user = req.user
        const products = await productModel.find({ isDeleted: false, recipientId: user.id }).populate("recipientId", "_id").select("-createdAt -updatedAt -__v -isDeleted")
        return successRes({ res, data: { products }, message: "Done", status: 201 })
    }
)
export const addProduct = asyncHandler(
    async (req, res, next) => {
        const recipientId = req.user._id
        
        const { productName, price, category, quantity } = req.body;
        const product = await productModel.create({ productName, price, category, quantity, recipientId });
        if (req.file) {
            const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
                folder: `${process.env.APP_Name}/products`,
                public_id: `${product._id}`
            });
            product.image.secure_url = secure_url;
            product.image.public_id = public_id;
            await product.save();
        }
        return successRes({ res, data: { product }, message: "Done", status: 201 });
    }
);
export const Deleteproduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!product) {
            return next(new Error("product not found"), { cause: 404 })
        }
        return successRes({ res, data: { product }, message: "Done", status: 201 });
    }
);
export const UpdateProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { quantity, productName, price, category } = req.body
        const product = await productModel.findByIdAndUpdate(id, { quantity, productName, price, category }, { new: false });
        if (!product) {
            return next(Object.assign(new Error("Product not found"), { status: 404 }));
        }
        if (req.file) {
            if (product.image && product.image.public_id) {
                await cloud.uploader.destroy(product.image.public_id);
            }
            const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
                folder: `${process.env.APP_Name}/products`,
                public_id: `${product._id}`
            });
            product.image.secure_url = secure_url;
            product.image.public_id = public_id;
            await product.save();

        }
        if (!product) {
            return next(new Error("product not found"), { cause: 404 })
        }
        return successRes({ res, data: { product }, message: "Done", status: 201 });
    }
);