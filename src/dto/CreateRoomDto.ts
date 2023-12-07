import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsString()
    photo?: string;

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