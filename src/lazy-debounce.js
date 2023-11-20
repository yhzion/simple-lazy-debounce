/**
 * SimpleLazyDebounce
 *
 * @param fn callback
 * @param {defaultDelay = 300, maxDelay = 500, latencyIncrement = 100} options
 * @returns fn
 */
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
    if (!Number.isInteger(value) || (Number.isInteger(value) && value < 0)) {
      throw new Error(
        `Invalid option value for key '${key}': ${value}. It must be a unsigned integer.`,
      );
    }
  }

  const defaultDelay = _options.defaultDelay;
  const maxDelay = _options.maxDelay;
  const latencyIncrement = _options.latencyIncrement;

  let computedDelay = defaultDelay;
  let lastCallTime = 0;

  return (args) => {
    const now = Date.now();
    clearTimeout(lastCallTime);

    if (now - lastCallTime > computedDelay) {
      computedDelay = Math.min(computedDelay + latencyIncrement, maxDelay);
    } else {
      computedDelay = defaultDelay;
    }

    lastCallTime = setTimeout(() => {
      callback.apply(this, args);
    }, computedDelay);
  };
};
