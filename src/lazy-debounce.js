export const SimpleLazyDebounce = (callback, options) => {
  let _options = options;

  if (!_options) {
    _options = {
      defaultDelay: 300,
      maxDelay: 500,
      latencyIncrement: 100,
    };
  }

  for (const key in _options) {
    const value = _options[key];
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(
        `Invalid option value for key '${key}': ${value}. It must be a non-negative integer.`,
      );
    }
  }

  const defaultDelay = _options.defaultDelay;
  const maxDelay = _options.maxDelay;
  const latencyIncrement = _options.latencyIncrement;

  let computedDelay = defaultDelay;
  let lastCallTime = 0;
  let timeoutId;

  return (...args) => {  // `...args` to capture arguments
    const now = Date.now();

    if (now - lastCallTime > computedDelay) {
      computedDelay = Math.min(computedDelay + latencyIncrement, maxDelay);
    } else {
      computedDelay = defaultDelay;
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args); // Pass arguments to callback
      lastCallTime = Date.now(); // Set lastCallTime when the callback is executed
    }, computedDelay);
  };
};
