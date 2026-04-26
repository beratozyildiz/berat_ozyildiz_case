import { Page, expect } from '@playwright/test';
import { CareersLocators } from './locators/careers.locators';

export class CareersPage {
  constructor(private page: Page) {}

  async goTo() {
    console.log('🌐 Navigating to Careers page');
    await this.page.goto('https://useinsider.com/careers/');
  }

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/careers/);
  }

  async navigateToQAPositions() {
    console.log('➡️ Opening QA positions');

    // 1. Click "See all teams"
    const seeAllTeams = CareersLocators.seeAllTeams(this.page);
    await seeAllTeams.scrollIntoViewIfNeeded();
    await seeAllTeams.click();

    // 2. Wait QA card visible
    const qaCard = CareersLocators.qaCard(this.page);
    await expect(qaCard).toBeVisible({ timeout: 10000 });

    // 3. Open Positions button inside QA card
    const openPositions = CareersLocators.openPositionsInQA(this.page);
    await expect(openPositions).toBeVisible();

    // 🔥 Wait until count is updated (not 0)
    await expect(openPositions).not.toHaveText(/^\s*0\s+Open Positions/i, {
      timeout: 10000,
    });

    // 4. Read count
    const text = await openPositions.textContent();
    const count = Number(text?.match(/\d+/)?.[0] ?? 0);

    console.log(`📊 QA Open Positions: ${count}`);

    // 5. Validate
    expect(count).toBeGreaterThan(0);

    // 6. Navigate to jobs page
    await Promise.all([
      this.page.waitForURL(/lever\.co/),
      openPositions.click(),
    ]);

    console.log('✅ Navigated to QA job listings');
  }
}