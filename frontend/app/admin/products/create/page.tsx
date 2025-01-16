import { Metadata } from 'next';
import { ProductForm } from './ProductForm';

export const metadata: Metadata = {
  title: 'Create product',
};

export default async function CreateProduct() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <ProductForm />
    </main>
  );
}
