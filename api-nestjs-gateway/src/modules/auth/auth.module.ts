import { Module } from '@nestjs/common';

import { ResponseHandlerModel } from '../../shared/model/response-handler.model';
import { UserService } from '../user/user.service';

@Module({
  providers: [UserService, ResponseHandlerModel]
})
export class AuthModule {}
