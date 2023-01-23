import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { Users } from './user.type';

@ObjectType()
export class LoginUserDef {
  @Field(() => Users, { nullable: true, description: 'users information' })
  @IsOptional()
  readonly user: Users;

  @Field({ nullable: true, description: 'tells the status after login' })
  @IsOptional()
  @IsString()
  readonly message: string;

  @Field({ nullable: true, description: 'tells about token expiration' })
  @IsOptional()
  @IsString()
  readonly expiresIn: string;

  @Field({ nullable: true, description: 'token for authentication' })
  @IsOptional()
  @IsString()
  readonly token: string;

  @Field({ nullable: true, description: 'to refresh token' })
  @IsOptional()
  @IsString()
  readonly refreshToken: string;
}
