import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RoomDto {
  @IsOptional()
    description?: string;

  @IsNotEmpty()
  @IsNumber()
    price: number;

  @IsNumber()
  @IsNotEmpty()
    rooms: number;

  @IsNumber()
  @IsNotEmpty()
    beds: number;
}