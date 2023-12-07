import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (private readonly prismaService: PrismaService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin = await this.prismaService.administrator.findFirst({
      where: {
        id: request.user.id,
      },
    });
    if (!admin) throw new HttpException('You dont have permission to perform this action', HttpStatus.FORBIDDEN);
    return true;
  }
}