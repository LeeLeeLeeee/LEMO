import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async get(key) {
        return await this.cacheManager.get(key);
    }

    async set(key, value, option: CachingConfig) {
        return await this.cacheManager.set(key, value, option);
    }

    async delete(key) {
        return await this.cacheManager.del(key);
    }
}
