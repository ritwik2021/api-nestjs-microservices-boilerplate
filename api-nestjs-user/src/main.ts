import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  const serviceUrl = configService.get('USER_SERVER_URL');

  const microService = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: serviceUrl,
      package: 'users',
      protoPath: join(__dirname, './shared/_proto/user.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true,
        keepCase: true
      },
      maxReceiveMessageLength: Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000,
      maxSendMessageLength: Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000
    }
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: [configService.get('KAFKA_BROKER_URL')]
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer'
  //     }
  //   }
  // });

  app.useGlobalPipes(new ValidationPipe());

  // await app.startAllMicroservices();
  await microService.listen();
  Logger.log(`User Microservice is running on ${serviceUrl}`, `Application Server`);
}
bootstrap();
