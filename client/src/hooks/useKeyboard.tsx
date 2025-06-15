import { useState, useEffect } from 'react';

interface KeyState {
  [key: string]: boolean;
}

export const useKeyboard = () => {
  const [keys, setKeys] = useState<KeyState>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prev => ({
        ...prev,
        [event.code]: true
      }));
      console.log('Key pressed:', event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys(prev => ({
        ...prev,
        [event.code]: false
      }));
      console.log('Key released:', event.code);
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { keys };
};
