import config from '../config/index.js';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import path, {dirname} from 'path';

const mailer = (res, to, sub, url) => {
    // Getting EMAIL And PASSWORD From Which Mail Will Be Sent
    const { EMAIL, PASSWORD, MAIN_URL } = config;

    // Creating Mail Transporter From Nodemailer (Currently Using YAHOO Service)
    let transporter = nodemailer.createTransport({
        service: "Yahoo",
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
    });

    // Generating Mail Using Mailgen Library
    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Doorway",
            link: MAIN_URL,
        },
    });

    // Creating Response For Email
    let response = res;

    // Converting To Mail
    let mail = MailGenerator.generate(response);

    // Type Your Subject And Receiver's Mail And Sender's Mail
    let message = {
        from: EMAIL,
        to: to,
        subject: sub,
        html: mail,
        attachments: [{
            filename: 'image.png',
            path: url,
        }]
    };

    // Finally Sending The Mail
    transporter
        .sendMail(message)
        .then((res) => {
            console.log("Mail Sent");
        })
        .catch((error) => console.log(error));
}

export { mailer }