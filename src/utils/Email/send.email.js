import nodemailer from "nodemailer";

export const sendEmail = async ({
    to = "",
    subject = "",
    text = "",
    cc = "",
    bcc = "",
    html="",
    attachments = "",
} = {}) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Corrected host
            port: 465, // Port for secure SMTP
            secure: true, // Use SSL
            auth: {
                user: process.env.EMAIL, // Gmail email
                pass: process.env.EMAIL_PASSWORD, // Gmail app password
            },
        });

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"Maddison Foo Koch 👻" <${process.env.EMAIL}>`, // Sender address
            to,
            cc,
            bcc,
            subject,
            text,
            html, 
            attachments, // Attachments (optional)
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};
