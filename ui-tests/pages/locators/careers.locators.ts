import { Page } from '@playwright/test';

export const CareersLocators = {
  seeAllTeams: (page: Page) =>
    page.locator('.inso-btn.see-more'),

  qaCard: (page: Page) =>
    page.locator('[data-department="Quality Assurance"]'),

  openPositionsInQA: (page: Page) =>
    page
      .locator('[data-department="Quality Assurance"]')
      .locator('.insiderone-icon-cards-grid-item-btn'),
};