'use client';

import { useActionState } from 'react';
import { signInWithCredentials } from '@/server/actions/user.actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  // To redirect user with callbackUrl from example email
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <form
      action={action}
      className="bg-white p-6 rounded shadow-md w-full max-w-sm"
    >
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <h2 className="text-2xl mb-4 text-center text-gray-700">Sign In</h2>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full mt-1 p-2 border rounded text-gray-700"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full mt-1 p-2 border rounded text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sign In
      </button>

      {data && !data.success && (
        <div className="text-center text-destructive text-gray-700">
          {data.message}
        </div>
      )}

      <div className="text-sm text-center text-muted-foreground text-gray-700 mt-5">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" target="_self" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
