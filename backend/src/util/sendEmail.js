const nodemailer = require('nodemailer');


async function sendVerificationEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to,
        subject,
        html: body
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;
