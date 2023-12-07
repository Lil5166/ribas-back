import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty({
    message: 'Email should be not empty',
  })
  @IsEmail()
    email: string;
  @IsNotEmpty()
    password: string;
}