import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from '..';

describe('TypeormConfigService', () => {
    let app: TestingModule;
    let configService: ConfigService;

    const configuration = () => ({});

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    load: [configuration],
                    cache: true
                })
            ]
        }).compile();

        configService = app.get(ConfigService);
    });

    it('should throw Typeorm Config Not Found', () => {
        const typeormConfigService = new TypeOrmConfigService(configService);
        expect(() => typeormConfigService.createTypeOrmOptions()).toThrow(Error);
        expect(() => typeormConfigService.createTypeOrmOptions()).toThrow(new Error('Typeorm Config Not Found'));
    });

    it('should return options', () => {
        const options = {
            typeorm: {
                type: 'mysql'
            },
            MYSQL_USERNAME: 'TestUsername',
            MYSQL_PASSWORD: 'TestPassword',
            MYSQL_DATABASE: 'TestDatabase',
            MYSQL_HOST: 'TestHost'
        };

        jest.spyOn(configService, 'get').mockImplementation(property => options[property]);

        const typeormConfigService = new TypeOrmConfigService(configService);
        const typeormOptions = typeormConfigService.createTypeOrmOptions();
        expect(typeormOptions.type).toEqual('mysql');
        expect(typeormOptions.username).toEqual('TestUsername');
        expect(typeormOptions.password).toEqual('TestPassword');
        expect(typeormOptions.database).toEqual('TestDatabase');
        expect(typeormOptions.host).toEqual('TestHost');
    });
});
