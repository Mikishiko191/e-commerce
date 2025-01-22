import { getProducts } from '@/server/actions/product.actions';
import { useQuery } from '@tanstack/react-query';

export function useGetProducts() {
  return useQuery({
    queryFn: async () => getProducts(),
    queryKey: ['users'],
  });
}
