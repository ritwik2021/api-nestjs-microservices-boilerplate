import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-z]{2,4}|[0-9]{1,3})(\]?)$/, {
    message: 'Invalid email format'
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!^\.)(?!.*?\.\.)(?!.*?\_\_)[a-z0-9_.]+$/, {
    message: 'Invalid metaID format'
  })
  @MinLength(5)
  @MaxLength(15)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!.*?\ \ )[A-Za-z ]+$/, {
    message: 'Invalid full name format'
  })
  @MinLength(5)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/, {
    message: 'Invalid password format'
  })
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  readonly dob: string;
}
