import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { AdminGuard } from '../security/adminGuard';
import { HotelsService } from './hotels.service';
import { HotelByIdPipe } from '../pipes/HotelByIdPipe';
import { RoomByIdPipe } from '../pipes/RoomByIdPipe';
import { CreateHotelDto } from '../dto/CreateHotelDto';
import { CreateRoomDto } from '../dto/CreateRoomDto';
import { UpdateRoomDto } from '../dto/UpdateRoomDto';
import { UpdateHotelDto } from '../dto/UpdateHotelDto';

@Controller('/hotel')
export class HotelsController {
  constructor (private readonly hotelsService: HotelsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create (@Req() req, @Body() body: CreateHotelDto) {
    return this.hotelsService.createHotel(body, req.user.id);
  }

  @Get()
  getAll (@Query('location') location: string) {
    return this.hotelsService.getAllHotels(location);
  }

  @Get('/:hotelId')
  get (@Param('hotelId', HotelByIdPipe) hotelId: string) {
    return this.hotelsService.getByHotelId(hotelId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('/:hotelId')
  updateHotel (
    @Req() req,
    @Param('hotelId', HotelByIdPipe) hotelId: string,
    @Body() body: UpdateHotelDto,
  ) {
    this.hotelsService.checkAdminHotel(req.user.hotelId, hotelId);
    return this.hotelsService.updateHotelById(hotelId, body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/:hotelId/rooms')
  createRoom (
    @Req() req,
    @Param('hotelId', HotelByIdPipe) hotelId: string,
    @Body() body: CreateRoomDto) {
    this.hotelsService.checkAdminHotel(req.user.hotelId, hotelId);
    return this.hotelsService.createRoom(hotelId, body);
  }

  @Get('/:hotelId/rooms')
  getRooms (@Param('hotelId', HotelByIdPipe) hotelId: string) {
    return this.hotelsService.getRoomsByHotelId(hotelId);
  }

  @Get('/:hotelId/rooms/:roomId')
  async getRoom (
    @Param('hotelId', HotelByIdPipe) hotelId: string,
    @Param('roomId', RoomByIdPipe) roomId: string,
  ) {
    await this.hotelsService.checkIsRoomInHotel(hotelId, roomId);
    return this.hotelsService.getRoomById(roomId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('/:hotelId/rooms/:roomId')
  async updateRoom (
    @Req() req,
    @Param('hotelId', HotelByIdPipe) hotelId: string,
    @Param('roomId', RoomByIdPipe) roomId: string,
    @Body() body: UpdateRoomDto,
  ) {
    this.hotelsService.checkAdminHotel(req.user.hotelId, hotelId);
    await this.hotelsService.checkIsRoomInHotel(hotelId, roomId);

    return this.hotelsService.updateRoomById(roomId, body);
  }
}