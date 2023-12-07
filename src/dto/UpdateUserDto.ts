import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
    name?: string;

  @IsOptional()
  @IsString()
    surname?: string;

  @IsOptional()
  @IsString()
    patronymic?: string;

  @IsOptional()
  @IsString()
    phoneNumber?: string;
}