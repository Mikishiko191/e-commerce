'use client';

import {
  useDeleteUser,
  useCreateUser,
  useGetUsers,
  useUpdateUser,
} from '@/hooks/useUsers';
import { IUser } from '@/server/actions/user.actions';

export default function Posts() {
  const { data: users } = useGetUsers();
  const deleteUserMutation = useDeleteUser();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleCreateUser = (username: string, email: string) => {
    createUserMutation.mutate({ username, email });
  };

  const handleUpdateUser = (id: number, username: string, email: string) => {
    updateUserMutation.mutate({ id, username, email });
  };

  return (
    <>
      <h1 className="text-6xl font-bold font-mono">Mikes BE & FE Result</h1>
      <button
        onClick={() =>
          handleCreateUser(`Updated Name 1`, `mikes@email+1.again`)
        }
      >
        Create User
      </button>
      <div className="grid grid-cols-3 gap-4 pt-12">
        {users?.map((user: IUser) => {
          const { id, username, email } = user;

          return (
            <li key={id}>
              {username}
              {email}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button
                onClick={() =>
                  handleUpdateUser(
                    id,
                    `hashlama didi ${id}`,
                    `mikes@email+${id}.again`,
                  )
                }
              >
                Update user
              </button>
            </li>
          );
        })}
      </div>
    </>
  );
}
