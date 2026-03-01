import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Counts down from `initialSeconds` to 0.
 * Call `reset()` to restart the countdown.
 */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSeconds(initialSeconds);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, [initialSeconds]);

  useEffect(() => {
    start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  return { seconds, reset: start };
}
