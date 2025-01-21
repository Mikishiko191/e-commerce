import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  @IsOptional()
  shippingCost?: number;

  @IsString()
  createdById: string;

  @IsString()
  @IsOptional()
  shippingTime?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
