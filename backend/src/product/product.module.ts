import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VisionService } from '../vision/vision.service';

@Module({
  providers: [ProductService, VisionService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
