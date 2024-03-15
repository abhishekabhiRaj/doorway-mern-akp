import config from '../config/index.js';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const mailer = () => {
    // Getting 
    const { EMAIL, PASSWORD, MAIN_URL } = config;

    let transporter = nodemailer.createTransport({
        service: "Yahoo",
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
    });


    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Doorway",
            link: MAIN_URL,
        },
    });

    let response = {
        body: {
            name: "Abhishek Raj",
            intro: "Hi Abhishek You visit is accepted",
        },
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: 'bcoder48@gmail.com',
        subject: "Request Accepted",
        html: mail,
    };

    transporter
        .sendMail(message)
        .then((res) => {
            console.log("REs", res);
        })
        .catch((error) => console.log(error));
}

export { mailer }