import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { times } from 'const/variable';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                ttl: times.MINUTE * 3,
            }),
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
