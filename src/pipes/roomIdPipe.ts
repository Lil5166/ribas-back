import { PipeTransform, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomIdPipePipe implements PipeTransform {
  constructor (private readonly prismaService: PrismaService) {}
  async transform (roomId: string) {
    const room = await this.prismaService.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) throw new Error('Room with such id is not exist');
    return roomId;
  }
}