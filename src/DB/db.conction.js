import mongoose from "mongoose";


const connectDB = async () => {
    mongoose.connect(process.env.DB_URI).then(res => {
        console.log(`DB is connected`);

    }).catch(err => {
        console.error("there is error at connect", err);

    })

}

export default connectDB