import { userQueryRSC } from '@/lib/fetchUsers';

export default async function Home() {
  // Fetch data on the server
  const users = await userQueryRSC();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold font-mono">Mikes BE & FE Result</h1>
      <div className="grid grid-cols-3 gap-4 pt-12">
        {users.map(({ id, username, email }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center space-y-4 p-4 dark:bg-neutral-900 bg-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-md shadow"
          >
            <p className="text-xl font-mono font-medium dark:text-neutral-200 text-neutral-800">
              {username} {email}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
