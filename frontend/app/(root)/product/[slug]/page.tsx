import { ProductOverview } from './ProductOverview';
import { ProductDetails } from './ProdcutDetails';
import { ProductReview } from './ProductReview';

export default async function ProductPage() {
  return (
    <>
      <ProductOverview />
      <ProductDetails />
      <ProductReview />
    </>
  );
}
