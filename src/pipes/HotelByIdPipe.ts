import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HotelByIdPipe implements PipeTransform {
  constructor (private readonly prismaService: PrismaService) {}
  async transform (hotelId: string): Promise<string> {
    const hotel = this.prismaService.hotel.findFirst({
      where: {
        id: hotelId,
      },
    });

    if (!hotel) {
      throw new HttpException('Hotel with this id is not found', HttpStatus.BAD_REQUEST);
    }

    return hotelId;
  }
}