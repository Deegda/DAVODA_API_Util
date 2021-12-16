import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer';

describe('MailerService', () => {
    let app: TestingModule;
    let configService: ConfigService;
    let mailerService: MailerService;

    const configuration = () => ({});

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    load: [configuration],
                    cache: true
                })
            ],
            providers: [MailerService]
        }).compile();

        configService = app.get(ConfigService);
        mailerService = app.get(MailerService);
    });

    it('should return email in options', () => {
        const options = {
            email: {
                service: 'naver',
                host: 'smtp.naver.com',
                port: 587,
                auth: {
                    user: 'aaa@naver.com',
                    pass: 'aaa12345'
                }
            }
        };

        jest.spyOn(configService, 'get').mockImplementation(property => options[property]);

        const mailerConfig = mailerService.createMailerConfig();

        expect(mailerConfig.service).toEqual('naver');
        expect(mailerConfig.host).toEqual('smtp.naver.com');
        expect(mailerConfig.port).toEqual(587);
        expect(mailerConfig.auth.user).toEqual('aaa@naver.com');
        expect(mailerConfig.auth.pass).toEqual('aaa12345');
    });

    it('should return email out options', () => {
        const options = {
            MAILER_SERVICE: 'naver',
            MAILER_HOST: 'smtp.naver.com',
            MAILER_PORT: 587,
            MAILER_EMAIL: 'aaa@naver.com',
            MAILER_PASSWORD: 'aaa12345'
        };

        jest.spyOn(configService, 'get').mockImplementation(property => options[property]);

        const mailerConfig = mailerService.createMailerConfig();

        expect(mailerConfig.service).toEqual('naver');
        expect(mailerConfig.host).toEqual('smtp.naver.com');
        expect(mailerConfig.port).toEqual(587);
        expect(mailerConfig.auth.user).toEqual('aaa@naver.com');
        expect(mailerConfig.auth.pass).toEqual('aaa12345');
    });
});
