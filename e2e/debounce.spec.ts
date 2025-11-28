import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testHtmlPath = path.resolve(__dirname, 'test.html');

test.describe('Simple Lazy Debounce E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`file://${testHtmlPath}`);
  });

  test('should display the test UI', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(
      'Simple Lazy Debounce E2E Test',
    );
    await expect(page.locator('#clickBtn')).toBeVisible();
    await expect(page.locator('#resetBtn')).toBeVisible();
  });

  test('should increment click count on each click', async ({ page }) => {
    const clickBtn = page.locator('#clickBtn');

    await clickBtn.click();
    await expect(page.locator('#clickCount')).toHaveText('1');

    await clickBtn.click();
    await expect(page.locator('#clickCount')).toHaveText('2');

    await clickBtn.click();
    await expect(page.locator('#clickCount')).toHaveText('3');
  });

  test('should debounce rapid clicks', async ({ page }) => {
    // Rapid clicks using JavaScript (synchronous, no delay)
    await page.evaluate(() => {
      const btn = document.getElementById('clickBtn');
      for (let i = 0; i < 10; i++) {
        btn?.click();
      }
    });

    // Wait for debounce to complete
    await page.waitForTimeout(1500);

    const clickCount = await page.locator('#clickCount').textContent();
    const execCount = await page.locator('#execCount').textContent();

    expect(Number(clickCount)).toBe(10);
    expect(Number(execCount)).toBeLessThan(10);
    expect(Number(execCount)).toBeGreaterThan(0);
  });

  test('should reset counters on reset button click', async ({ page }) => {
    const clickBtn = page.locator('#clickBtn');
    const resetBtn = page.locator('#resetBtn');

    await clickBtn.click();
    await clickBtn.click();
    await page.waitForTimeout(500);

    await resetBtn.click();

    await expect(page.locator('#clickCount')).toHaveText('0');
    await expect(page.locator('#execCount')).toHaveText('0');
  });

  test('should execute callback after delay', async ({ page }) => {
    const clickBtn = page.locator('#clickBtn');

    await clickBtn.click();
    await expect(page.locator('#execCount')).toHaveText('0');

    // Wait for default delay (300ms) + buffer
    await page.waitForTimeout(500);

    await expect(page.locator('#execCount')).toHaveText('1');
  });
});
