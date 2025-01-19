import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { VisionService } from '../vision/vision.service';
import { File as MulterFile } from 'multer';

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  constructor(private readonly visionService: VisionService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(
    image: MulterFile,
    dto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    // Get analysis from VisionService
    const analysis = await this.visionService.analyzeImage(image.buffer);
    // Combine Vision result + DTO
    const data = {
      title: analysis.possibleTitle || dto.title,
      price: analysis.possiblePrice || dto.price,
      description: analysis.possibleDescription || dto.description,
      color: analysis.possibleColors?.[0]?.toString() || dto.color,
      imageUrls: dto.imageUrls || [],
      stock: dto.stock,
      category: dto.category,
      slug: dto.slug,
      tags: dto.tags,
      isAvailable: dto.isAvailable,
      viewCount: dto.viewCount,
      shippingCost: dto.shippingCost,
      shippingTime: dto.shippingTime,
      averageRating: dto.averageRating,
      discountPrice: dto.discountPrice,
      discountPercentage: dto.discountPercentage,
      createdById: userId,
      ...dto,
      ...analysis,
    };

    return this.prisma.product.create({ data });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
