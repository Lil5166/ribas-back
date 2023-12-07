import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [AuthModule, HotelsModule, BookingModule],
})
export class AppModule {}
