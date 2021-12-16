import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { SendMailOptions } from 'nodemailer';

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) {}

    createMailerConfig(): MailerConfigType {
        const option = this.configService.get('email') || {};

        option.service ??= this.configService.get('MAILER_SERVICE') || 'naver';
        option.host ??= this.configService.get('MAILER_HOST') || 'smtp.naver.com';
        option.port ??= this.configService.get('MAILER_PORT') || 587;
        option.auth ??= {
            user: this.configService.get('MAILER_EMAIL'),
            pass: this.configService.get('MAILER_PASSWORD')
        };

        return option;
    }

    sendEmail(email: string, code: string) {
        const mailConfig = this.createMailerConfig();
        const transpoter = nodemailer.createTransport(mailConfig);

        const fromEmail = mailConfig.auth.user;

        const message: SendMailOptions = {
            from: fromEmail,
            to: email,
            subject: '[DAVODA] 이메일 인증 코드',
            html: `<p>${code}</p>`
        };

        transpoter
            .sendMail(message)
            .then(() => 'mail send success')
            .catch(() => 'mail send failed');
    }
}

export interface MailerConfigType {
    service: string;
    host: string;
    port: number;
    auth: MailerConfigAuthType;
}

export interface MailerConfigAuthType {
    user: string;
    pass: string;
}
