import { execSync } from 'child_process';
import path from 'path';

describe('Package Import', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: 'ignore' });
  });

  test('should work when imported as a built package', async () => {
    const modulePath = path.resolve(__dirname, '../../dist/index.cjs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SimpleLazyDebounce } = require(modulePath);
    jest.useFakeTimers();
    const callback = jest.fn();
    const debounced = SimpleLazyDebounce(callback, { defaultDelay: 50 });
    debounced('hello');
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledWith('hello');
  });
});
