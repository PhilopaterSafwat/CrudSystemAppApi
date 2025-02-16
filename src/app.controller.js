import connectDB from "./DB/db.conction.js";
import authController from "./modules/auth/auth.controller.js"
import usercontroller from "./modules/user/user.controller.js"
import productController from "./modules/product/product.controller.js"
import { globalErrorHandling } from "./utils/error/error.js";
import cors from "cors"
connectDB()



const bootstrap = (app, express) => {
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
        credentials: true
    }));
    app.use(express.json())
    app.get('/', (req, res, next) => {
        res.send('Hello World!');
    });
    app.use("/auth", authController)
    app.use("/user", usercontroller)
    app.use("/product", productController)
    app.use(globalErrorHandling)
}

export default bootstrap