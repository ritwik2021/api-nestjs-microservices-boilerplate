import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-z]{2,4}|[0-9]{1,3})(\]?)$/, {
    message: 'Invalid email format'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message: 'Invalid username format'
  })
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!.*?\ \ )[A-Za-z ]+$/, {
    message: 'Invalid full name format'
  })
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/, {
    message: 'Invalid password format'
  })
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
    {
      message: 'Invalid mobile format add + and country code example +91'
    }
  )
  @MinLength(8)
  @MaxLength(15)
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*$/, {
    message: 'Invalid date format yyyy-mm-dd'
  })
  dob: string;
}
