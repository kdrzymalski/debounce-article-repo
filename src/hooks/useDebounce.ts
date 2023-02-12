import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (callback, timeout = 300) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const latestCallbackFunction = () => {
      ref.current?.();
    };

    return debounce(latestCallbackFunction, timeout);
  }, []);
};
