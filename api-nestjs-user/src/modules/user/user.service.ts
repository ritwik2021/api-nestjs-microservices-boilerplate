import { Injectable } from '@nestjs/common';
import { GlobalReturnType } from 'src/shared/interfaces/general.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  async ping(): Promise<{ message }> {
    return { message: 'Pong!' };
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return { message: 'access Token Deleted', success: true };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      username: 'John',
      password: 'password',
      isEmailVerified: true,
      role: 'user',
      status: 'active',
      mobile: '123456',
      state: 'jhr',
      pinCode: '12345',
      country: 'US',
      address: 'df34',
      city: 'fg45',
      dob: '23456',
      isBlocked: false,
      isUsernameConfirmed: true,
      lastLogin: new Date(),
      profilePicUrl: 'https://rtyui',
      updatedAt: new Date(),
      createdAt: new Date(),
      walletAddress: '3erfgh'
    };
    return {
      message: 'login success',
      statusCode: 201,
      user,
      token: '34567',
      refreshToken: '234567'
    };
  }

  async logout(accessToken: string): Promise<GlobalReturnType> {
    console.log('🚀 ~ file: user.service.ts:11 ~ UserService ~ logout ~ accessToken', accessToken);
    return { message: 'access Token Deleted', success: true };
  }
}
