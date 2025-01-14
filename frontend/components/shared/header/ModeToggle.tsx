'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'light' ? (
        <button onClick={() => setTheme('dark')}>
          <MoonIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </button>
      ) : (
        <button onClick={() => setTheme('light')}>
          <SunIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </button>
      )}
    </>
  );
};

export default ModeToggle;
