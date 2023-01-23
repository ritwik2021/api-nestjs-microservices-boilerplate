import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ResponseHandlerModel } from '../../shared/model/response-handler.model';

@Module({
  imports: [],
  providers: [UserResolver, UserService, ResponseHandlerModel],
  exports: [UserResolver, UserService]
})
export class UserModule {}
