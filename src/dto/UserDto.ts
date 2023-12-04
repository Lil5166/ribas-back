import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty({
    message: 'Email should be not empty',
  })
  @IsEmail()
    email: string;
  @IsNotEmpty()
    password: string;
  @IsNotEmpty()
    name: string;
  @IsNotEmpty()
    surname: string;
  @IsOptional()
    patronymic: string;
  @IsNotEmpty()
  @IsPhoneNumber()
    phoneNumber: string;
}