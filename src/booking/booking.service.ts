import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingDto } from '../dto/BookingDto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingService {
  constructor (private readonly prismaService: PrismaService) {}

  async booking (body: BookingDto, userId: string, roomId: string) {
    const booking = await this.prismaService.room.findFirst({
      where: {
        id: roomId,
        booking: {
          some: {
            booking: {
              OR: [{ startDate: {
                lte: body.endDate,
              },
              endDate: {
                lte: body.endDate,
              } }, {
                startDate: {
                  lte: body.startDate,
                },
                endDate: {
                  lte: body.startDate,
                },
              }],
            },
          },
        },
      },
    });
    if (booking) {
      throw new BadRequestException('Booking with such period is already exist');
    }

    const room = await this.prismaService.room.findFirst({
      where: {
        id: roomId,
      },
    });
    const bookingPrice = body.nights * room.price;

    return this.prismaService.booking.create({
      data: {
        ...body,
        userId,
        bookingPrice,
        rooms: {
          create: {
            roomId,
          },
        },
      },
    });
  }
}