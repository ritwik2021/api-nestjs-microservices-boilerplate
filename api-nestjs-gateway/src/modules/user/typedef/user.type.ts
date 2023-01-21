import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

@ObjectType()
export class Users {
  @Field({ nullable: true, description: "user's name" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field({ nullable: true, description: "user's email" })
  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field({ nullable: true, description: "user's username" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-z0-9_-]+$/, {
    message: 'regex error'
  })
  readonly username: string;

  @Field({ nullable: true, description: "user's password" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Field({ nullable: true, description: 'tells if email is verified' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isEmailVerified: boolean;

  @Field({ nullable: true, description: "user's role" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @Field({ nullable: true, description: "user's status" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @Field({ nullable: true, description: "user's mobile number" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$|^[0-9]{11}$/, {
    message: 'mobile number regex error'
  })
  readonly mobile: string;

  @Field({ nullable: true, description: "user's unique id" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @Field({ nullable: true, description: 'toggle for disabling user' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isBlocked: boolean;

  @Field({ nullable: true, description: 'user lastLogin timestamp' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly lastLogin: string;

  @Field({ nullable: true, description: "user's dob" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]*$/, {
    message: 'regex error'
  })
  readonly dob: string;

  @Field({
    nullable: true,
    description: "user's state"
  })
  @IsOptional()
  @IsString()
  readonly state: string;

  @Field({
    nullable: true,
    description: "user's pinCode"
  })
  @IsOptional()
  @IsString()
  readonly pinCode: string;

  @Field({
    nullable: true,
    description: "user's country"
  })
  @IsOptional()
  @IsString()
  readonly country: string;

  @Field({
    nullable: true,
    description: "user's address"
  })
  @IsOptional()
  @IsString()
  readonly address: string;

  @Field({
    nullable: true,
    description: "user's city"
  })
  @IsOptional()
  @IsString()
  readonly city: string;

  @Field({
    nullable: true,
    description: 'Profile picture url of the user'
  })
  @IsOptional()
  @IsString()
  readonly profilePicUrl: string;

  @Field({ nullable: true, description: 'user updatedAt timestamp' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly updatedAt: string;

  @Field({ nullable: true, description: 'user createdAt timestamp' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;

  @Field({ nullable: true, description: "user's trash status" })
  @IsOptional()
  @IsString()
  readonly deletedAt: string;

  @Field({ nullable: true, description: "user's trash status" })
  @IsOptional()
  @IsString()
  readonly deletedPermanentAt: string;
}
