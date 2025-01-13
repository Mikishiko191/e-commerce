import { Metadata } from 'next';
import SignUpForm from './sign-up-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
};

const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
