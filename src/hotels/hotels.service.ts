import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../dto/CreateHotelDto';
import { PrismaService } from '../prisma.service';
import { CreateRoomDto } from '../dto/CreateRoomDto';
import { UpdateRoomDto } from '../dto/UpdateRoomDto';
import { UpdateHotelDto } from '../dto/UpdateHotelDto';

@Injectable()
export class HotelsService {
  constructor (private readonly prismaService: PrismaService) {}

  async createHotel (body: CreateHotelDto, adminId: string) {
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

  async updateHotelById (hotelId: string, data: UpdateHotelDto) {
    return this.prismaService.hotel.update({
      where: {
        id: hotelId,
      },
      data,
    });
  }

  async findAllHotels (location: string) {
    return this.prismaService.hotel.findMany({
      where: {
        location: {
          contains: location,
        },
      },
    });
  }

  getByHotelId (id: string) {
    return this.prismaService.hotel.findFirst({
      where: {
        id,
      },
    });
  }

  checkAdminHotel (adminHotelId: string, hotelId: string) {
    if (adminHotelId !== hotelId) {
      throw new ForbiddenException('You have not permission to perform this action');
    }
  }

  async createRoom (hotelId: string, body: CreateRoomDto) {
    return this.prismaService.room.create({
      data: {
        ...body,
        hotelId,
      },
    });
  };

  getRoomsById (hotelId: string) {
    return this.prismaService.room.findMany({
      where: {
        hotelId,
      },
    });
  }

  updateRoomById (roomId: string, data: UpdateRoomDto) {
    return this.prismaService.room.update({
      where: {
        id: roomId,
      },
      data,
    });
  }
}