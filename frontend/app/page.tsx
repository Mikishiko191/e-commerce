import { UserButton } from '@/components/shared/header/UserButton';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UserButton />
      main page go here
      <Button>Button from shancd/UI</Button>
    </main>
  );
}
