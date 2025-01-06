import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController], // Only controllers should be listed here
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Registers RolesGuard globally within this module
    },
  ],
})
export class UserModule {}
