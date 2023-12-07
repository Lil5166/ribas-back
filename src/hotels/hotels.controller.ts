import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { HotelDto } from '../dto/HotelDto';
import { RoomDto } from '../dto/RoomDto';
import { AdminGuard } from '../security/adminGuard';

@Controller('/hotel')
export class HotelsController {
  constructor (private readonly hotelsService: HotelsService) {
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create (@Req() req, @Body() body: HotelDto) {
    return this.hotelsService.createHotel(body, req.user.id);
  };
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/create-room')
  createRoom (@Req() req, @Body() body: RoomDto) {
    return this.hotelsService.createRoom(body, req.user.hotelId);
  }
  // @Get()
  // getAll (@Query() location: string) {
  //   return this.hotelsService.findAll(location);
  // }
}