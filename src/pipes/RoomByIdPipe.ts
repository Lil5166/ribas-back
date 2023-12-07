import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomByIdPipe implements PipeTransform {
  constructor (private readonly prismaService: PrismaService) {}
  async transform (roomId: string): Promise<string> {
    const room = await this.prismaService.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new HttpException('Room with this id is not found', HttpStatus.BAD_REQUEST);
    }

    return roomId;
  }
}