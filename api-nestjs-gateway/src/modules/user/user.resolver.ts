import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginUserDef } from './typedef/login-user.type';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './typedef/user.type';
import { GlobalMessageResponse } from 'src/shared/interfaces/general.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guards';
import { GetRequest } from '../auth/decorators/get-user.decorator';

@Resolver(() => Users)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * @description This method is a GraphQL query to check the ping.
   * @author Ritwik Rohitashwa
   */
  @Query(() => String)
  async ping(): Promise<any> {
    return await this.userService.ping();
  }

  /**
   * @description This method is a GraphQL mutation that allows user to login.
   * @param {LoginUserDto} loginUserDto - The input data for login a user.
   * @returns {Promise<LoginUserDef>} - Returns a promise that resolves with the login user data.
   * @author Ritwik Rohitashwa
   */
  @Mutation(() => LoginUserDef, { name: 'login' })
  async login(@Args('input') loginUserDto: LoginUserDto): Promise<LoginUserDef> {
    return await this.userService.login(loginUserDto);
  }

  /**
   * @description This method is a GraphQL mutation that creates a user.
   * @param {CreateUserDto} createUserDto - The input data for creating a user.
   * @returns {Promise<LoginUserDef>} - Returns a promise that resolves with the created user.
   * @author Ritwik Rohitashwa
   */
  @Mutation(() => LoginUserDef, { name: 'createUser' })
  async create(@Args('input') createUserDto: CreateUserDto): Promise<LoginUserDef> {
    return await this.userService.create(createUserDto);
  }

  /**
   * @description This method calls the user-svc to logout the user and delete the access token from the DB.
   * @param {Request} request .
   * @returns {Promise<GlobalMessageResponse>} - Returns a promise that resolves with the success message.
   * @author Ritwik Rohitashwa
   */
  @UseGuards(AuthGuard)
  @Mutation(() => GlobalMessageResponse, { name: 'logout' })
  async logout(@GetRequest() request: any): Promise<GlobalMessageResponse> {
    const authToken: string = request.headers['authorization']?.split(' ')[1];
    return await this.userService.logout(authToken);
  }
}
