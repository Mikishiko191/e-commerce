import ProductList from '@/components/shared/product/ProductList';

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <ProductList />
    </main>
  );
}
