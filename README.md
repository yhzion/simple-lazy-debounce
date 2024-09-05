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

const logMessage = (message, additionalInfo) => {
  console.log(`Message: ${message}, Info: ${additionalInfo}`);
};

// Create a debounced function
const debouncedLogMessage = SimpleLazyDebounce(logMessage, {
  defaultDelay: 300, // ms
  maxDelay: 1000, // ms
  latencyIncrement: 200, // ms
});

// Call the debounced function with arguments
debouncedLogMessage("Hello", "This is a test"); // First call
debouncedLogMessage("Hello again", "Another test"); // Second call

// The first call will be executed after 300ms,
// and the second call will be executed 500ms after the first call
// console output after 300ms: Message: Hello, Info: This is a test
// console output after an additional 500ms: Message: Hello again, Info: Another test
```

## Changelog

For detailed changelog, see the CHANGELOG.md file.
