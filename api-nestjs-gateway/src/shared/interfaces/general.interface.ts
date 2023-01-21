import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class GlobalMessageResponse {
  @Field({ nullable: true, description: 'message of the response' })
  @IsOptional()
  @IsString()
  readonly message: string;

  @Field({ nullable: true, description: 'success of the response' })
  @IsOptional()
  @IsBoolean()
  readonly success: boolean;
}
