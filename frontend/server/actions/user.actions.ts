const API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

export interface IUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export const getUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

/**
 * Create User Action
 */
export interface ICreateUser {
  username: string;
  email: string;
}

export const createUser = async (userData: ICreateUser): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};

/**
 * Update User Action
 */

export interface IUpdateUser {
  id: number;
  username: string;
  email: string;
}

export const updateUser = async (user: IUpdateUser): Promise<IUser> => {
  const { id, ...userData } = user;
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user with id "${id}".`);
  }

  return response.json();
};

/**
 * Delete User Action
 */
export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};
