import { signOutUser } from '@/server/actions/user.actions';

export const UserButton = () => {
  return (
    <>
      <form action={signOutUser} className="w-full">
        <button className="w-full py-4 px-2 h-4 justify-start">Sign Out</button>
      </form>
    </>
  );
};
