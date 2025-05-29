import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const item = localStorage.getItem(key);

    try {
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    const valueToSet = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToSet);

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(valueToSet));
    }
  };

  return [storedValue, setValue] as const;
}
