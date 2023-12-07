import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, HotelsModule, BookingModule, UserModule],
})
export class AppModule {}
