import { IsNotEmpty, IsOptional } from 'class-validator';

export class HotelDto {
  @IsOptional()
    description?: string;
  @IsNotEmpty()
    location: string;
  @IsNotEmpty()
    title: string;
}