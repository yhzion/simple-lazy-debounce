interface DebounceOptions {
  defaultDelay?: number;
  maxDelay?: number;
  latencyIncrement?: number;
}

export const SimpleLazyDebounce = <Args extends unknown[]>(
  callback: (..._args: Args) => void,
  options?: DebounceOptions,
): ((..._args: Args) => void) => {
  const _options: DebounceOptions = {
    // 'let' 대신 'const' 사용
    defaultDelay: 300,
    maxDelay: 500,
    latencyIncrement: 100,
    ...options,
  };

  for (const key in _options) {
    const value = _options[key as keyof DebounceOptions];
    if (!Number.isInteger(value) || (value !== undefined && value < 0)) {
      // 타입 단언 제거
      throw new Error(
        `Invalid option value for key '${key}': ${value}. It must be a non-negative integer.`,
      );
    }
  }

  const { defaultDelay, maxDelay, latencyIncrement } = _options;

  let computedDelay = defaultDelay ?? 300;
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    const now = Date.now();

    if (now - lastCallTime > computedDelay) {
      computedDelay = Math.min(
        computedDelay + (latencyIncrement ?? 100),
        maxDelay ?? 500,
      );
    } else {
      computedDelay = defaultDelay ?? 300;
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
      lastCallTime = Date.now();
    }, computedDelay);
  };
};
