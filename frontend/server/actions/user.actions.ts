'use server';

import { signIn, signOut } from '@/auth';
import { signInFormSchema, signUpFormSchema } from '../../lib/validators';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { AUTH_URL } from '@/lib/constants';

export async function signUpWithCredentials(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signUpFormSchema.parse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const res = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error('Invalid credentials');
    }

    const response = await res.json();

    console.log(response, 'response');

    return {
      success: true,
      message: 'You registered successfully. Please check your email',
    };
  } catch (error) {
    console.log(error, 'error');
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: 'Show message here if error. Next show BE error',
    };
  }
}

export async function signInWithCredentials(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);
    console.log(user, 'user');
    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    console.log(error, 'error');
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Show message here if error' };
  }
}

export const signOutUser = async () => {
  await signOut();
};
