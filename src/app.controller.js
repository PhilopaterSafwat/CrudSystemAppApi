import connectDB from "./DB/db.conction.js";
import authController from "./modules/auth/auth.controller.js"
import usercontroller from "./modules/user/user.controller.js"
import productController from "./modules/product/product.controller.js"
import { globalErrorHandling } from "./utils/error/error.js";
import cors from "cors"
connectDB()



const bootstrap = (app, express) => {
    const allowedOrigins = ["https://crudsystem32.netlify.app", "https://crud-system-seven.vercel.app"];
    app.use(
        cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            methods: "GET,POST,PUT,DELETE",
            allowedHeaders: "Content-Type,Authorization",
            credentials: true,
        })
    );
    app.options("*", cors()); 
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