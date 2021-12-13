import { ModuleMetadata } from '@nestjs/common';
import { ConfigurationOptions } from 'aws-sdk';

export interface IS3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<ConfigurationOptions> | ConfigurationOptions;
    inject?: any[];
}
