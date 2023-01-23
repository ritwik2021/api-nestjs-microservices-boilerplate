import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ROLES_KEY } from './auth.guards';
import { ResponseMessage } from '../../../shared/constant/ResponseMessage';
import { ResponseStatusCode } from '../../../shared/constant/ResponseStatusCode';
import { ResponseHandlerModel } from '../../../shared/model/response-handler.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private responseHandlerModel: ResponseHandlerModel) {}

  /**
   * @description this function checks if a user has the required role to access a certain route or resource
   * @param {ExecutionContext} context - The current execution context.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user has the required role, and false otherwise.
   * @author Ritwik Rohitashwa
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const userRole = user?.role || '';
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const hasAllRequiredRoles = roles.includes(userRole);

    if (!roles || roles.length === 0 || hasAllRequiredRoles) {
      return true;
    }
    await this.responseHandlerModel.error(ResponseMessage.NOT_ADMIN, ResponseStatusCode.UNAUTHORIZED);
  }
}
