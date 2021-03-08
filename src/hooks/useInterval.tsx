import React, { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      (savedCallback.current as () => void)();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      console.log('[INTERVAL] is RUN', id);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
