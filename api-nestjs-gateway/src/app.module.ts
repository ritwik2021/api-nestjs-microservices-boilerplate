import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, HttpStatus, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './shared/env-schema/env-schema';
import { LoggerMiddleware } from './shared/logger/logger.middleware';
import { LoggingInterceptor } from './shared/core/logging-interceptor';
import { loggerConfig } from './shared/logger/logger.config';
import { UserModule } from './modules/user/user.module';
import config from './shared/config/config';
import { GqlThrottlerGuard } from './shared/core/throttler.guard';
import { RedisConfigService } from './shared/config/redis.config';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalExceptionFilter } from './shared/core/globalExceptionHandler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [config]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        introspection: configService.get('ENV') === 'production' ? false : true,
        playground: configService.get('ENV') === 'production' ? false : true,
        context: ({ req }) => ({ req }),
        debug: false,
        formatError: (error: any) => {
          return error?.extensions?.exception?.details
            ? JSON.parse(error?.extensions?.exception?.details)
            : {
                message: error?.extensions?.response?.message || error.extensions.response.error || error,
                statusCode:
                  error?.extensions?.response?.statusCode || error.extension || HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                details: error?.extensions?.response?.stack || error?.extensions?.response?.error || error?.message,
                data: error?.extensions?.response?.data,
                timestamp: new Date().toISOString()
              };
        }
      })
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT')
      })
    }),
    CacheModule.registerAsync({
      useClass: RedisConfigService
    }),
    WinstonModule.forRoot(loggerConfig),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
