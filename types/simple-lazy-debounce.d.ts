declare module 'simple-lazy-debounce' {
  interface DebounceOptions {
    defaultDelay?: number;
    maxDelay?: number;
    latencyIncrement?: number;
  }

  export function SimpleLazyDebounce(
    callback: (...args: unknown[]) => void,
    options?: DebounceOptions,
  ): (...args: unknown[]) => void;
}
