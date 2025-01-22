'use client';

import { useGetProducts } from '@/app/hooks/useProducts';
import Image from 'next/image';

const ProductList = () => {
  const { data } = useGetProducts();
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Product name????</h2>

      <div className="mt-8 grid grid-cols-4 gap-y-12 gap-5">
        {data?.map((product) => (
          <div key={product.id}>
            <div className="relative">
              <div className="relative h-72 w-96 overflow-hidden rounded-lg">
                <Image
                  alt={product.description}
                  src={product.imageUrls[0]}
                  layout="fill"
                  objectFit="cover"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">ADD COLOR!</p>
              </div>
              <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                />
                <p className="relative text-lg font-semibold text-white">
                  {product.price}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                // href={product.href}
                className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                Add to bag<span className="sr-only">, {product.title}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
