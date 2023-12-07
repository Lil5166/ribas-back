import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { HotelDto } from '../dto/HotelDto';
import { PrismaService } from '../prisma.service';
import { RoomDto } from '../dto/RoomDto';

@Injectable()
export class HotelsService {
  constructor (private readonly prismaService: PrismaService) {}

  async createHotel (body: HotelDto, adminId: string) {
    const hotel = await this.prismaService.hotel.findFirst({
      where: {
        title: body.title,
      },
    });
    if (hotel) {
      throw new BadRequestException('Hotel is already exist');
    }

    return this.prismaService.hotel.create({
      data: {
        ...body,
        administrator: {
          connect: {
            id: adminId,
          },
        },
      },
    });
  }

  async createRoom (adminHotelId: string, hotelId: string, body: RoomDto) {
    if (adminHotelId !== hotelId) {
      throw new ForbiddenException('You have not permission to perform this action');
    }

    return this.prismaService.room.create({
      data: {
        ...body,
        hotelId,
      },
    });
  };

  async findAll (location: string) {
    return this.prismaService.hotel.findMany({
      where: {
        location: {
          contains: location,
        },
      },
    });
  }

  getById (id: string) {
    return this.prismaService.hotel.findFirst({
      where: {
        id,
      },
    });
  }

  getRoomsById (hotelId: string) {
    return this.prismaService.room.findMany({
      where: {
        hotelId,
      },
    });
  }
}