import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

export const UserServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_SERVER_URL,
    package: 'users',
    protoPath: join(__dirname, '../../shared/_proto/user.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true,
      keepCase: true
    },
    maxReceiveMessageLength: Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000,
    maxSendMessageLength: Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000
  }
};
