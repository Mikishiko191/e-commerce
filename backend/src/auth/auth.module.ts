import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MagicStrategy } from './strategies/magic.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { MagicAuthGuard } from './guards/magic.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    MagicStrategy,
    JwtAuthGuard,
    MagicAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
