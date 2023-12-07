import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HotelDto {
  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsString()
    photo?: string;

  @IsNotEmpty()
  @IsString()
    location: string;

  @IsNotEmpty()
  @IsString()
    title: string;
}