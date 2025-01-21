import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VisionService } from '../vision/vision.service';
import { SupabaseService } from '../supabase.service';

@Module({
  providers: [ProductService, VisionService, SupabaseService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
