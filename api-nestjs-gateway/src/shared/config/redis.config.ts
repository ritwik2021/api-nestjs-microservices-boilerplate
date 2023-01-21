import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      isGlobal: true,
      // store: redisStore,
      url: this.configService.get<string>('REDIS_URL'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      tls: this.configService.get<number>('REDIS_TLS'),
      max: this.configService.get<number>('REDIS_MAX')
    };
  }
}
