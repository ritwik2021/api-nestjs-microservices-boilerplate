import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field({ nullable: false, description: "enter the user's email" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-z]{2,4}|[0-9]{1,3})(\]?)$/, {
    message: 'Invalid email format'
  })
  readonly email: string;

  @Field({ nullable: false, description: "enter the user's username" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message: 'Invalid username format'
  })
  @MinLength(8)
  @MaxLength(20)
  readonly username: string;

  @Field({ nullable: false, description: "enter the user's Full name" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!.*?\ \ )[A-Za-z ]+$/, {
    message: 'Invalid full name format'
  })
  @MinLength(5)
  @MaxLength(30)
  readonly name: string;

  @Field({ nullable: false, description: "enter the user's password" })
  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/, {
    message: 'Invalid password format'
  })
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  readonly password: string;

  @Field({ nullable: false, description: "enter user's mobile number" })
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
  readonly mobile: string;

  @Field({
    nullable: false,
    description: "Enter the user's date of birth YYYY-MM-DD"
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*$/, {
    message: 'Invalid date format yyyy-mm-dd'
  })
  readonly dob: string;
}
