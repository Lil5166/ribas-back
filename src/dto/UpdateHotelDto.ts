import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsString()
    photo?: string;

  @IsOptional()
  @IsString()
    location?: string;

  @IsOptional()
  @IsString()
    title?: string;
}