import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) & {
  cancel: () => void;
  flush: () => void;
} {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const argsRef = useRef<Parameters<T> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const debouncedFn = (...args: Parameters<T>) => {
    argsRef.current = args;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
      timeoutRef.current = null;
    }, delay);
  };

  debouncedFn.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  debouncedFn.flush = () => {
    if (timeoutRef.current && argsRef.current) {
      clearTimeout(timeoutRef.current);
      const args = argsRef.current;
      callback(...args);
      timeoutRef.current = null;
    }
  };

  return debouncedFn;
}
