import { useEffect, useState } from 'react';

export function useGameTimer(isActive: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const resetTimer = () => setTime(0);

  return { time, resetTimer };
}
