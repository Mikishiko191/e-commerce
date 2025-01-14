import { UserButton } from '@/components/shared/header/UserButton';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <UserButton />
      Mega page main
      <Button>Button from shancd/UI</Button>
    </main>
  );
}
