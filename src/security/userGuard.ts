import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor (private readonly prismaService: PrismaService) {
  }
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.prismaService.user.findFirst({
      where: {
        id: request.user.id,
      },
    });
    if (!user) throw new Error('You dont have permission to perform this action');
    return true;
  }
}