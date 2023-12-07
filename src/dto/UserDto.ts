import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @IsString()
    password: string;

  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsString()
    surname: string;

  @IsOptional()
  @IsString()
    patronymic?: string;

  @IsNotEmpty()
  @IsString()
    phoneNumber: string;
}