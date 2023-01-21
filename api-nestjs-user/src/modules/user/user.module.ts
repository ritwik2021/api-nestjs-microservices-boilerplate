import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseHandlerModel } from '../../shared/model/response-handler.model';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseHandlerModel]
})
export class UserModule {}
