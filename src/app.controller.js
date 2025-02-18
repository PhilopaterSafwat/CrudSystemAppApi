import connectDB from "./DB/db.conction.js";
import authController from "./modules/auth/auth.controller.js";
import usercontroller from "./modules/user/user.controller.js";
import productController from "./modules/product/product.controller.js";
import { globalErrorHandling } from "./utils/error/error.js";
import cors from "cors";

connectDB();

const bootstrap = (app, express) => {
    app.use(express.json());

    app.use(cors({
        origin: '*',  // السماح فقط من هذا الدومين
        methods: ['GET', 'POST', 'PUT'],  // السماح بهذه الطرق
        allowedHeaders: ['Content-Type',"Authorization"]  // السماح بهذا الـ header
    }));
    app.options('*', cors());  // السماح بـ OPTIONS requests
    app.get('/', (req, res, next) => {
        res.send('Hello World!');
    });

    app.use("/auth", authController);
    app.use("/user", usercontroller);
    app.use("/product", productController);

    app.use(globalErrorHandling);
};

export default bootstrap;
