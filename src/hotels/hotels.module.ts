import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [HotelsService, PrismaService],
  controllers: [HotelsController],
  imports: [],
  exports: [HotelsService],
})
export class HotelsModule {}