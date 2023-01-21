import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  @Field({ nullable: true, description: "enter user's email or username" })
  @IsString()
  @IsNotEmpty()
  readonly emailOrUsername: string;

  @Field({ nullable: true, description: "enter user's password" })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
