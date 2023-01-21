import { InputType, Int, Field } from '@nestjs/graphql';
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
  @Matches(/^(?!^\.)(?!.*?\.\.)(?!.*?\_\_)[a-z0-9_.]+$/, {
    message: 'Invalid metaID format'
  })
  @MinLength(5)
  @MaxLength(15)
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
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/, {
    message: 'Invalid password format'
  })
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  readonly password: string;

  @Field({ nullable: false, description: "enter user's mobile number" })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  readonly mobile: string;

  @Field({
    nullable: false,
    description: "Enter the user's date of birth YYYY-MM-DD"
  })
  @IsString()
  @IsNotEmpty()
  readonly dob: string;
}
