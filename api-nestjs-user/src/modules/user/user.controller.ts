import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GlobalReturnType } from 'src/shared/interfaces/general.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'ping')
  async ping(): Promise<{ message }> {
    return await this.userService.ping();
  }

  @GrpcMethod('UserService', 'login')
  async login(loginUserDto: LoginUserDto): Promise<any> {
    return await this.userService.login(loginUserDto);
  }

  @GrpcMethod('UserService', 'create')
  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'logout')
  async logout(accessToken: string): Promise<any> {
    return await this.userService.logout(accessToken);
  }
}
