// emailUtils.js

import nodemailer from 'nodemailer';

async function sendMail(email) {
    // Create an email transporter.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chillfrags98@gmail.com',
            pass: 'kkuquthwwnnzxzok'
        }
    });

    // Configure email content.
    const mailOptions = {
        from: 'chillfrags98@gmail.com',
        to: email,
        subject: 'Welcome to Pookie',
        text: 'Thank you for signing up, your account has been successfully created',
    };

    // Send email
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email send failed with error:', error);
    }
}

export default sendMail;
