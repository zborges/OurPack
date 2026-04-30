import { test, expect } from '@playwright/test';

test.describe('Example E2E Tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OurPack/);
  });

  test('renders main page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
