import { ModuleMetadata } from '@nestjs/common';
import { ConfigurationOptions } from 'aws-sdk';

export interface ISESModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<ConfigurationOptions> | ConfigurationOptions;
    inject?: any[];
}
