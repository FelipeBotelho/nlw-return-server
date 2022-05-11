import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7806da814883c3",
        pass: "1d75ab4962d4c5"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@fidget.com>',
            to: 'Felipe Botelho <botelhofelipebotelho@gmail.com>',
            subject,
            html: body
        })
    }

}