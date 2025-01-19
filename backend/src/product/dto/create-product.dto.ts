export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  imageUrls?: string[];
  color?: string;
  stock?: number;
  category?: string;
  slug?: string;
  tags?: string[];
  isAvailable?: boolean;
  viewCount?: number;
  shippingCost?: number;
  shippingTime?: string;
  averageRating?: number;
  discountPrice?: number;
  discountPercentage?: number;
}

export class UpdateProductDto extends CreateProductDto {}
