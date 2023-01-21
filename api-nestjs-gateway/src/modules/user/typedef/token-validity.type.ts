import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Users } from './user.type';

@ObjectType()
export class TokenValidityDef {
  @Field({ nullable: true, description: 'tells the status after login' })
  @IsOptional()
  @IsString()
  readonly message: string;

  @Field({ nullable: true, description: 'tells the status of token' })
  @IsOptional()
  @IsBoolean()
  readonly success: boolean;
}
