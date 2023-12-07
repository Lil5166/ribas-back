import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
    startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
    endDate: Date;

  @IsNotEmpty()
  @IsNumber()
    nights: number;
}