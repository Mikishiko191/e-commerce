import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
  IUpdateUser,
  ICreateUser,
} from '@/server/actions/user.actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetUsers() {
  return useQuery({
    queryFn: async () => getUsers(),
    queryKey: ['users'],
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => deleteUser(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: IUpdateUser) => updateUser(userData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: ICreateUser) => createUser(userData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
