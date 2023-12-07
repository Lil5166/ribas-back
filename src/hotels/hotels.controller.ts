import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { HotelDto } from '../dto/HotelDto';
import { RoomDto } from '../dto/RoomDto';
import { AdminGuard } from '../security/adminGuard';
import { HotelByIdPipe } from '../pipes/HotelByIdPipe';

@Controller('/hotel')
export class HotelsController {
  constructor (private readonly hotelsService: HotelsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create (@Req() req, @Body() body: HotelDto) {
    return this.hotelsService.createHotel(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/create-room')
  createRoom (@Req() req, @Body() body: RoomDto) {
    return this.hotelsService.createRoom(body, req.user.hotelId);
  }

  @Get()
  getAll (@Query('location') location: string) {
    return this.hotelsService.findAll(location);
  }

  @Get('/:hotelId')
  get (@Param('hotelId', HotelByIdPipe) hotelId: string) {
    return this.hotelsService.getById(hotelId);
  }

  @Get('/:hotelId/rooms')
  getRooms (@Param('hotelId', HotelByIdPipe) hotelId: string) {
    return this.hotelsService.getRoomsById(hotelId);
  }
}