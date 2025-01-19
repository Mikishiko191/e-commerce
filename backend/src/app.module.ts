import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductService } from './product/product.service';
import { VisionService } from './vision/vision.service';
// Module imports
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { SupabaseMiddleware } from 'common/middlewares/supabase.middleware';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SupabaseService,
    PrismaService,
    ProductService,
    VisionService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SupabaseMiddleware).forRoutes(ProductController); // Apply globally to all routes
  }
}
