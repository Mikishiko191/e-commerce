import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { File as MulterFile } from 'multer';
import { User } from '../user/decorators/user.decorator';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() image,
    @Body() dto: CreateProductDto,
    // @User('id') userId: string,
  ) {
    // Let's first upload image
    // Then when user get possible data from image
    // Use update endpoint to update the product if user did't like the data creating product
    console.log('image', image);
    console.log('dto', dto);
    // console.log('id', userId);
    // return this.productService.create(image, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
