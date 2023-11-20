# Simple Lazy Debounce

Simple Lazy Debounce is a lightweight JavaScript library that provides a simple way to debounce function calls.

If a function call is made within the `defaultDelay` time, the delay is incremented by `latencyIncrement`, up to the value of `maxDelay`. For example, if there were 5 calls every 100 ms, the function would be executed once at 1001 ms.

## Installation

You can install Simple Lazy Debounce using npm:

```shell
npm install simple-lazy-debounce
```

## Usage

```javascript
import { SimpleLazyDebounce } from "simple-lazy-debounce";

const doSomething = SimpleLazyDebounce(
  // your callback function
  () => {
    console.log("Do something!");
  },
  // options
  {
    defaultDelay: 300, // ms
    maxDelay: 500, // ms
    latencyIncrement: 100, // ms
  },
);

setTimeout(() => {
  doSomething();
}, 100);

setTimeout(() => {
  doSomething();
}, 200);

setTimeout(() => {
  doSomething();
}, 300);

setTimeout(() => {
  doSomething();
}, 400);

setTimeout(() => {
  doSomething();
}, 500);

// Executed once at 1001 ms
// console output: Do something!
```
