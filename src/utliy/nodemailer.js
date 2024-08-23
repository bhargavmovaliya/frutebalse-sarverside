const nodemailer = require('nodemailer');
const exportpdfmake = require('./pdfmaker');


const sendMail = async (receiverEmail) => {
    console.log(receiverEmail);
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
            user: "bhargavmovaliya576@gmail.com",
            pass: "hkbapczqiwdrsaga",
        }
    });

    exportpdfmake()
    const mailOptions = {
        from: 'bhargavmovaliya576@gmail.com', // sender address
        to: receiverEmail, // receiver's email address
        subject: "Node Js Mail Testing", // Subject line
        text: "Your registration is successful", // plain text body
        attachments : [
            {
            filename: 'imag1.png',
            path: "./src/utliy/Image/imag1.png"
        },
        {
            filename: 'document.pdf',
            path: "../../backend/ecommers/document.pdf"
        }
    ]
        
    };

    await transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error) throw error;
        console.log("Email sent successfully!");
    });
};

module.exports = sendMail;