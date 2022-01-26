import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_CONNECTION_OPTIONS } from './constant';
import { IS3ModuleAsyncOptions } from './interfaces/s3.options';
import { S3Service } from './service/s3.service';

@Module({})
export class AwsModule {
    static forRootS3Async(options: IS3ModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                }
            ],
            exports: [S3Service]
        };
    }
}
