import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserDef } from './typedef/login-user.type';
import { TokenValidityDef } from './typedef/token-validity.type';
import { UserServiceClientOptions } from './user-svc.options';
import { ResponseStatusCode } from '../../shared/constant/ResponseStatusCode';
import { GlobalMessageResponse } from '../../shared/interfaces/general.interface';
import { ResponseHandlerModel } from '../../shared/model/response-handler.model';
import { UserServiceInterface } from '../../shared/_proto/interface/user.interface';

@Injectable()
export class UserService implements OnModuleInit {
  private userMicroService: any;
  constructor(private responseHandlerModel: ResponseHandlerModel) {}
  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  onModuleInit() {
    this.userMicroService = this.userServiceClient.getService<UserServiceInterface>('UserService');
  }

  /**
   * @description This method calls the user-svc to check the ping.
   * @returns string
   * @author Ritwik Rohitashwa
   */
  async ping(): Promise<string> {
    try {
      return (await this.userMicroService.ping({}).toPromise()).message;
    } catch (error) {
      this.responseHandlerModel.error(error.message, ResponseStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description This method calls the user-svc to check authentication that allows user to login.
   * @param {LoginUserDto} loginUserDto - The input data for login a user.
   * @returns {Promise<LoginUserDef>} - Returns a promise that resolves with the login user data.
   * @author Ritwik Rohitashwa
   */
  async login(loginUserDto: LoginUserDto): Promise<LoginUserDef> {
    try {
      return await this.userMicroService.login(loginUserDto).toPromise();
    } catch (error) {
      this.responseHandlerModel.error(error.message, ResponseStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description This method calls the user-svc to create a new user.
   * @param {CreateUserDto} createUserDto - The input data for create a user.
   * @returns {Promise<LoginUserDef>} - Returns a promise that resolves with the login user data.
   * @author Ritwik Rohitashwa
   */
  async create(createUserDto: CreateUserDto): Promise<LoginUserDef> {
    try {
      return await this.userMicroService.create(createUserDto).toPromise();
    } catch (error) {
      this.responseHandlerModel.error(error.message, ResponseStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description This method calls the user-svc to to check the validity of the token
   * @param {accessToken} accessToken jwt token
   * @param {browserId} browserId to check the genuine access token and browser
   * @param {userID} userId decoded user if to fetch user data from db
   * @returns {Promise<TokenValidityDef>} - Returns a promise that resolves with the token info data
   * @author Ritwik Rohitashwa
   */
  async fetchToken(accessToken: string, browserId: string, userID: string): Promise<TokenValidityDef> {
    try {
      // TODO: add redis connect to check the access token, if access token is not present or expired, then all this below function
      const options = {
        accessToken: accessToken,
        browserId: browserId,
        userID: userID,
        isBlocked: false,
        status: true
      };
      return await this.userMicroService.validateToken(options).toPromise();
    } catch (error) {
      this.responseHandlerModel.error(error.message, ResponseStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description This method calls the user-svc to logout the user and delete the access token from the DB.
   * @param {accessToken} accessToken - access token of the user.
   * @returns {Promise<GlobalMessageResponse>} - Returns a promise that resolves with the success message.
   * @author Ritwik Rohitashwa
   */
  async logout(accessToken: string): Promise<GlobalMessageResponse> {
    try {
      return await this.userMicroService.logout({ accessToken }).toPromise();
    } catch (error) {
      this.responseHandlerModel.error(error.message, ResponseStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
