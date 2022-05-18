import { useCallback, useRef } from 'react';

const useThrottleFn = <U extends any[]>(
    fn: (...args: U) => void,
    ms: number = 200
) => {
    const lastCallTime = useRef<number>(Date.now());
    const returnFunction = useCallback<(...args: U) => void>((...args) => {
        const now = Date.now();
        if (now - lastCallTime.current > ms) {
            lastCallTime.current = now;
            fn(...args);
        }
    }, []);

    return returnFunction;
};

export default useThrottleFn;
