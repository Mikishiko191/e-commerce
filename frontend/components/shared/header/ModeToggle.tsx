'use client';

import { useTheme } from 'next-themes';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === 'light' ? (
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      ) : (
        <button onClick={() => setTheme('light')}>Light Mode</button>
      )}
    </div>
  );
};

export default ModeToggle;
