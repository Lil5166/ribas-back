import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsString()
    photo?: string;

  @IsOptional()
  @IsNumber()
    price?: number;

  @IsOptional()
  @IsNumber()
    rooms?: number;

  @IsOptional()
  @IsNumber()
    beds?: number;
}