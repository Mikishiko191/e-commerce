import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  // controllers: [AppController],
  // providers: [
  //   AppService,
  //   PrismaService,
  //   // {
  //   //   provide: APP_GUARD,
  //   //   useClass: JwtAuthGuard, // Apply JwtAuthGuard globally
  //   // },
  // ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
