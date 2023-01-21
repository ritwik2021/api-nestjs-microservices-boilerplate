import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly emailOrUsername: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
