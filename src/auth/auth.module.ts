import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../security/localStrategy';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../security/jwtStrategy';

@Module({
  providers: [AuthService, LocalStrategy, PrismaService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: configService.get('EXPIRES') },
      }),
      inject: [ConfigService],
    })],
})
export class AuthModule {}
