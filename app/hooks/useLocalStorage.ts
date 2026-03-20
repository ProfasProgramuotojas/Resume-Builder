export function useLocalStorage<T>(key: string) {
  const get = (): T | null => {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
    return null;
  };

  const set = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { set, get };
}
