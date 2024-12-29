import { Module } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service'; // Adjust the path to where you have your PrismaService defined

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
