import { Injectable, CanActivate, ExecutionContext, HttpStatus, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import * as parser from 'ua-parser-js';

import { UserRole } from './role.enum';
import { ResponseHandlerModel } from '../../../shared/model/response-handler.model';
import { ResponseMessage, JWT_SETTINGS } from '../../../shared/constant';
import { UserService } from '../../user/user.service';

export const ROLES_KEY = 'roles';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private responseHandlerModel: ResponseHandlerModel,
    private reflector: Reflector
  ) {}

  /**
   * @description Check if user is authorized and has the correct role.
   * @param {ExecutionContext} context - Execution context containing request information.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating if the user is authorized and has the correct role.
   * @author Ritwik Rohitashwa
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    console.log(parser(req.headers['user-agent']));
    // const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    // console.log('🚀 ~ file: auth.guards.ts:31 ~ AuthGuard ~ canActivate ~ requiredRoles', requiredRoles);
    if (req.headers && req.headers.authorization) {
      console.log(req.headers['browserId']);
      // const isValidToken = await this.validateToken(req.headers.authorization, req.headers['browserId']);
      return true; //isValidToken && requiredRoles ? requiredRoles.includes(req.headers['role']) : false;
    }

    return false;
  }

  /**
   * @description Validate user token and extract user information.
   * @param {string} token - Token to be validated.
   * @param {Object} browserId - Additional information about the client's request.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating if the token is valid.
   * @author Ritwik Rohitashwa
   */
  async validateToken(bearerToken: string, browserId: string): Promise<boolean> {
    const token = bearerToken.split(' ');
    if (token[0] !== 'Bearer') {
      await this.responseHandlerModel.error(ResponseMessage.JWT_TOKEN_MISSING, HttpStatus.FORBIDDEN);
    }

    // Verify token and extract user information
    const decoded = await jwt.verify(token[1], JWT_SETTINGS.JWT_SECRET_KEY);
    const authToken = await this.userService.fetchToken(token[1], browserId, decoded.id);

    if (!authToken.success) {
      await this.responseHandlerModel.error({ message: authToken.message }, HttpStatus.UNAUTHORIZED);
    }

    return !!authToken.success;
  }
}
