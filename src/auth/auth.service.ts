import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/UserDto';

@Injectable()
export class AuthService {
  constructor (
    private readonly prismaService: PrismaService, 
    private readonly jwtService: JwtService, 
  ) {}

  async validateUser (email: string, password: string) {
    const client = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    const admin = await this.prismaService.administrator.findUnique({
      where: {
        email,
      },
    });
    const user = client ?? admin;
    if (!user) throw new UnauthorizedException('Невірна електронна адреса або пароль');
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) throw new UnauthorizedException('Невірна електронна адреса або пароль');
    delete user.password;
    return user;
  }

  async validateUserId (id: string) {
    const client = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    const admin = await this.prismaService.administrator.findUnique({
      where: {
        id,
      },
    });
    const user = client ?? admin;
    if (!user) throw new UnauthorizedException('Невірна електронна адреса або пароль');
    delete user.password;
    return user;
  }
  async getAccessToken (id: string) {
    const payload = {
      sub: id, 
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  async register (body: UserDto) {
    const { password, ...securedUser } = body;
    console.log(body);
    const user = await this.prismaService.user.findUnique({
      where: {
        email: securedUser.email,
      },
    });
    if (user) throw new Error('User already registered');
    const hashedPassword = await this.hashPassword(password);
    await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        ...securedUser,
      },
    });
  }
  private async hashPassword (password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
