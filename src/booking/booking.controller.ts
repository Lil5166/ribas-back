import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserGuard } from '../security/userGuard';
import { JwtAuthGuard } from '../security/jwtAuthGuard';
import { BookingDto } from '../dto/BookingDto';
import { BookingService } from './booking.service';
import { RoomByIdPipe } from '../pipes/RoomByIdPipe';

@Controller('/booking')
export class BookingController {
  constructor (private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post('/:roomId')
  booking (
    @Req() req,
    @Body() body: BookingDto,
    @Param('roomId', RoomByIdPipe) roomId: string
  ) {
    return this.bookingService.booking(body, req.user.id, roomId);
  }
}