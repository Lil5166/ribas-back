import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { UserGuard } from '../security/userGuard';
import { UpdateUserDto } from '../dto/UpdateUserDto';

@Controller('/users')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @Patch()
  @UseGuards(JwtAuthGuard, UserGuard)
  update (@Req() req, @Body() body: UpdateUserDto) {
    return this.userService.updateById(req.user.id, body);
  }

  @Get()
  getAll () {
    return this.userService.getAll();
  }

}