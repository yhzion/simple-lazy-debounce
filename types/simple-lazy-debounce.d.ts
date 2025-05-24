declare module 'simple-lazy-debounce' {
  interface DebounceOptions {
    defaultDelay?: number;
    maxDelay?: number;
    latencyIncrement?: number;
  }

  export function SimpleLazyDebounce<Args extends unknown[]>(
    callback: (..._args: Args) => void,
    options?: DebounceOptions,
  ): (..._args: Args) => void;
}
