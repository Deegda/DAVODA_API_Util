import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_CONNECTION_OPTIONS } from './constant';
import { IS3ModuleAsyncOptions } from './interfaces/s3.options';
import { ISESModuleAsyncOptions } from './interfaces/ses.options';
import { S3Service } from './service/s3.service';
import { SESService } from './service/ses.service';

@Module({})
export class AwsModule {
    static forRootSESAsync(options: ISESModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                SESService
            ],
            exports: [SESService]
        };
    }

    static forRootS3Async(options: IS3ModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                S3Service
            ],
            exports: [S3Service]
        };
    }
}
