import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetRequest = createParamDecorator((_data, context: ExecutionContext): Promise<any> => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req;
});
