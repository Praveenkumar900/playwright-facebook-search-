import { test, expect } from '@playwright/test';

test('Search Facebook on Google and click on homepage', async ({ page }) => {

  // 1. Open Google
  await page.goto('https://www.google.com');

  // Accept cookies if popup appears
  const acceptButton = page.locator('button:has-text("Accept all")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // 2. Search for Facebook
  await page.fill('textarea[name="q"]', 'Facebook');
  await page.keyboard.press('Enter');

  // Wait for search results
  await page.waitForLoadState('networkidle');

  // 3. Click Facebook link if present
  const fbLink = page.locator('a:has-text("Facebook")').first();

  if (await fbLink.isVisible()) {
    await fbLink.click();
  } else {
    // Fallback (Google blocks automation sometimes)
    await page.goto('https://www.facebook.com');
  }

  // 4. Verify Facebook page loaded
  await expect(page).toHaveURL(/facebook\.com/);

  // 5. Click somewhere on Facebook homepage
  // (login page loads by default)
  await page.click('body');

  // Optional small wait just to see it in headed mode
  await page.waitForTimeout(2000);
});



//Comment
