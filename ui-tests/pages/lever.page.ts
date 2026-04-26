import { Page, expect } from '@playwright/test';
import { LeverLocators } from './locators/lever.locators';

export class LeverPage {
  constructor(private page: Page) {}

  async filterByLocation(location: string) {
    console.log(`📍 Filtering jobs by location: ${location}`);

    await LeverLocators.locationFilter(this.page).click();

    const option = LeverLocators.locationOption(this.page, location);
    await option.waitFor({ state: 'visible' });
    await option.click();

    await this.page.waitForLoadState('networkidle');
  }

  async verifyJobsList(expectedLocation: string) {
  const jobs = LeverLocators.jobItems(this.page);

  await expect(jobs.first()).toBeVisible({ timeout: 10000 });

  const count = await jobs.count();

  console.log(`📊 Found ${count} job(s)`);

  for (let i = 0; i < count; i++) {
    const job = jobs.nth(i);
    const text = (await job.textContent())?.toLowerCase() || '';

    console.log(`🔎 Job ${i + 1}: ${text}`);

    const isQA =
      text.includes('quality assurance') ||
      text.includes('qa');

    expect(isQA).toBeTruthy();
    expect(text).toContain(expectedLocation.toLowerCase());
  }
}

  async applyToJob() {
    console.log('🚀 Applying to first available job');

    const listApply = LeverLocators.applyFromListButton(this.page).first();

    await expect(listApply).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      listApply.click(),
    ]);

    console.log('➡️ Navigated to job detail page');

    const finalApply = LeverLocators.applyForJobButton(this.page);

    await expect(finalApply).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForURL(/apply/, { timeout: 10000 }),
      finalApply.click(),
    ]);

    console.log('✅ Redirected to application form');
  }

  async verifyApplyPageOpened() {
    await expect(this.page).toHaveURL(/apply/, { timeout: 10000 });
  }

  async verifyNoJobsFound() {
    console.log('⚠️ Verifying no jobs found message');

    await expect(
      LeverLocators.noResultsText(this.page)
    ).toBeVisible();
  }
}