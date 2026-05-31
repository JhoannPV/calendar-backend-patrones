import nodemailer from 'nodemailer';
import { envs } from '..';

export class MailClient {
    private readonly transporter = nodemailer.createTransport({
        host: envs.MAIL_HOST,
        port: envs.MAIL_PORT,
        secure: false,
        auth: {
            user: envs.MAIL_USER,
            pass: envs.MAIL_PASS,
        },
    });

    async send(to: string, subject: string, html: string): Promise<void> {
        await this.transporter.sendMail({
            from: envs.MAIL_FROM,
            to,
            subject,
            html,
        });
    }
}
