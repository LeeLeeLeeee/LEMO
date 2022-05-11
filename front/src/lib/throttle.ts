/* eslint-disable no-param-reassign */
export default function throttle(
    callbackFn: (...args: any[]) => void,
    limit: number = 100
) {
    let lastScroll = Date.now();
    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastScroll > limit) {
            lastScroll = now;
            callbackFn(...args);
        }
    };
}
