# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A lightweight npm library providing a "lazy debounce" function - unlike standard debouncing with a fixed delay, this progressively increases delay times (by `latencyIncrement`) up to `maxDelay` when calls occur within the debounce window.

## Commands

```bash
npm test              # Run Jest tests with coverage
npm run build         # Build library (Vite + Rollup for .d.ts)
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
```

Run a single test:
```bash
npm test -- -t "test name pattern"
```

## Architecture

- **Entry point**: `index.ts` re-exports from `src/lazy-debounce.ts`
- **Core logic**: `src/lazy-debounce.ts` - single export `SimpleLazyDebounce`
- **Tests**: `src/__test__/lazy-debounce.test.ts` using Jest with fake timers
- **Build output**: `dist/` with ES, UMD, CJS formats plus TypeScript declarations

## Core Algorithm

The debounce function tracks `computedDelay` which starts at `defaultDelay`. If a new call arrives after `computedDelay` has elapsed since the last call, delay increases by `latencyIncrement` (capped at `maxDelay`). Otherwise, it resets to `defaultDelay`. This creates a "lazy" effect where rapid calls progressively extend the wait time.

## TypeScript Notes

- Uses `unknown[]` instead of `any[]` for callback arguments (type safety)
- Options interface: `defaultDelay`, `maxDelay`, `latencyIncrement` (all optional non-negative integers)
- Strict mode enabled with `noImplicitAny`
