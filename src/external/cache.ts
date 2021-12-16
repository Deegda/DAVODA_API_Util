import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key: string) {
        try {
            return await this.cache.get(key);
        } catch (e) {
            throw e;
        }
    }

    async set(key: string, value: string, ttl: number) {
        try {
            await this.cache.set(key, value, ttl);
        } catch (e) {
            throw e;
        }
    }
}
