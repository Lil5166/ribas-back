import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from '../dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  updateById (id: string, data: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  getAll () {
    return this.prismaService.user.findMany();
  }
}