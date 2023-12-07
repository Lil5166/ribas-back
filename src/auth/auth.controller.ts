import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../security/localAuthGuard';
import { UserDto } from '../dto/UserDto';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { AdminDto } from '../dto/AdminDto';
@Controller('/auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login (
    @Request() req
  ) {
    return this.authService.getAccessToken(req.user.id);
  }
  @Post('/registration')
  registrationUser (
    @Body() body: UserDto,
  ) {
    return this.authService.register(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getMe (@Request() req) {
    return req.user;
  }
  @Post('/reg-admin')
  regAdmin (
    @Body() body: AdminDto,
  ) {
    return this.authService.regAdmin(body);
  }
}
