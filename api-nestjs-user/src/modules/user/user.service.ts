import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import NodeRSA from 'node-rsa';

import { GlobalReturnType } from '../../shared/interfaces/general.interface';
import { argon2hash } from '../auth/argon2/argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserStatus } from './enum/user-status.enum';
import { User } from './interface/user.interface';
import { UserRole } from './schema/user.schema';

@Injectable()
export class UserService {
  private RSA_PRIVATE_KEY: string;
  constructor(@InjectModel('User') private userModel: Model<User>, private configService: ConfigService) {
    this.RSA_PRIVATE_KEY = this.configService.get('RSA_PRIVATE_KEY');
  }

  async ping(): Promise<{ message }> {
    return { message: 'Pong!' };
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // createUserDto.password = await this.decryptPassword(createUserDto.password);
      createUserDto.password = await argon2hash(createUserDto.password);
      createUserDto.email = createUserDto.email.toLowerCase();
      createUserDto['role'] = UserRole.USER;
      createUserDto['status'] = UserStatus.ACTIVE;

      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      return {
        message: 'login success',
        statusCode: 201,
        user,
        token: '34567',
        refreshToken: '234567'
      };
    } catch (error) {
      console.log(error);
    }
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

  /**
   * @description Asynchronously decrypts a given password using the private key stored in the configuration service.
   * @param {string} encryptedPassword - The password to decrypt.
   * @returns {Promise<string>} A promise that resolves to the decrypted password.
   * @author Ritwik Rohitashwa
   */
  async decryptPassword(encryptedPassword: string): Promise<string> {
    const privateKey = new NodeRSA(this.RSA_PRIVATE_KEY);
    return await privateKey.decrypt(encryptedPassword, 'utf8');
  }
}
