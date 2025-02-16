import express from 'express';
import 'dotenv/config'
// import * as dotenv from 'dotenv'
// dotenv.config({})
import bootstrap from './src/app.controller.js';
import { sendEmail } from './src/utils/Email/send.email.js';
const app = express();
const PORT = process.env.PORT || 8000

bootstrap(app, express)



app.listen(PORT, () => {
    console.log(`Example app listening on ${PORT}`);
});

