import { API_URL } from '@/lib/constants';

export interface ICreateProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  color?: string;
  stock?: number;
  category?: string;
  slug?: string;
  tags?: string[];
  isAvailable?: boolean;
  shippingCost?: number;
  createdById: string;
  shippingTime?: string;
  isPublished: boolean;
}

export const getProducts = async (): Promise<ICreateProduct[]> => {
  const response = await fetch(`${API_URL}/product`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};
