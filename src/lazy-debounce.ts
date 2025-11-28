export interface DebounceOptions {
  defaultDelay?: number;
  maxDelay?: number;
  latencyIncrement?: number;
}

export const SimpleLazyDebounce = <T extends unknown[]>(
  callback: (..._args: T) => void,
  {
    defaultDelay = 300,
    maxDelay = 500,
    latencyIncrement = 100,
  }: DebounceOptions = {},
): ((..._args: T) => void) => {
  const opts: [string, number][] = [
    ['defaultDelay', defaultDelay],
    ['maxDelay', maxDelay],
    ['latencyIncrement', latencyIncrement],
  ];
  for (const [k, v] of opts) {
    if (!Number.isInteger(v) || v < 0) {
      throw new Error(`Invalid option: ${k}`);
    }
  }

  let delay = defaultDelay,
    lastCall = 0,
    tid: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    delay =
      Date.now() - lastCall > delay
        ? Math.min(delay + latencyIncrement, maxDelay)
        : defaultDelay;
    clearTimeout(tid);
    tid = setTimeout(() => {
      callback(...args);
      lastCall = Date.now();
    }, delay);
  };
};
