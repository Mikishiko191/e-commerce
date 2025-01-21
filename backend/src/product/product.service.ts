import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { VisionService } from '../vision/vision.service';
import { File as MulterFile } from 'multer';
import { SupabaseService } from '../supabase.service';

// Google Vision API response
const analysis = {
  possibleTitle: 'Bag',
  possiblePrice: 0,
  possibleDescription:
    'Bag, Luggage & bags, Handbag, Strap, Shoulder Bag, Leather, Tote bag, Pocket, Baggage, Backpack',
  possibleColors: [
    { red: 84, green: 83, blue: 87, alpha: null },
    { red: 211, green: 188, blue: 166, alpha: null },
    { red: 239, green: 237, blue: 237, alpha: null },
    { red: 54, green: 54, blue: 56, alpha: null },
    { red: 114, green: 113, blue: 115, alpha: null },
    { red: 154, green: 153, blue: 154, alpha: null },
    { red: 31, green: 28, blue: 28, alpha: null },
    { red: 64, green: 49, blue: 34, alpha: null },
    { red: 169, green: 148, blue: 128, alpha: null },
    { red: 199, green: 195, blue: 194, alpha: null },
  ],
};

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  constructor(
    private readonly visionService: VisionService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(image: MulterFile, userId: string): Promise<Product> {
    // Let make user upload on;y one image and after use update endpoint to update the product
    try {
      const fileUrl = await this.supabaseService.uploadFile(image);
      // Assuming 'analysis' is obtained from some analysis service
      // const analysis = await this.analyzeImage(image);

      const data = {
        title: analysis.possibleTitle,
        price: analysis.possiblePrice,
        description: analysis.possibleDescription,
        color: analysis.possibleColors?.[0]?.toString(),
        imageUrls: [fileUrl],
        isAvailable: true,
        tags: [],
        isPublished: false,
        createdBy: { connect: { id: userId } },
      };

      return await this.prisma.product.create({ data });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async update(id: string, dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
