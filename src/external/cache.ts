import { CacheModuleOptions, CacheOptionsFactory, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createCacheOptions() {
        const options = this.configService.get<CacheModuleOptions>('cache') || {};

        options.host ??= this.configService.get('REDIS_HOST');

        return options;
    }
}

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key: string) {
        try {
            const a = await this.cache.get(key);
            return a;
        } catch (e) {
            throw e;
        }
    }

    async set(key: string, value: string, ttl: number) {
        try {
            const a = await this.cache.set(key, value, { ttl });
            return a;
        } catch (e) {
            throw e;
        }
    }
}
