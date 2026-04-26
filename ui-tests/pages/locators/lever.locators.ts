import { Page } from '@playwright/test';

export const LeverLocators = {
  locationFilter: (page: Page) =>
    page.getByRole('button', { name: /^filter by location:/i }),

  locationOption: (page: Page, location: string) =>
    page.getByRole('link', { name: location, exact: true }),

  jobItems: (page: Page) =>
    page.locator('.posting'),

  applyFromListButton: (page: Page) =>
    page.locator('.posting-btn-submit'),

  applyForJobButton: (page: Page) =>
  page.locator('[data-qa="show-page-apply"]'),

  noResultsText: (page: Page) =>
    page.locator('.no-postings-message'),
  
};