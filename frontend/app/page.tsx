// 'use client';

import Posts from '@/components/users';
import {
  // createUser,
  // deleteUser,
  getUsers,
} from '@/server/actions/user.actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

// import { useUpdateUser, useAddUser, useDeleteUser, useUsers } from './hooks';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  // const users = await getUsers();
  // // const { data: users, error, isLoading } = useUsers();
  // // const addUserMutation = useAddUser();
  // // const deleteUserMutation = useDeleteUser();
  // // const updateUserMutation = useUpdateUser();

  // const handleAddNewUser = async () => {
  //   'use server';
  //   await createUser('mikes1', 'mikus1@axtungus1.testus');
  // };

  // const handleDeleteUser = async () => {
  //   'use server';
  //   await deleteUser(17);
  // };

  // const handleUpdateUser = (id: number, username: string, email: string) => {
  //   updateUserMutation.mutate({ id, username, email });
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading users</div>;
  // console.log(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
