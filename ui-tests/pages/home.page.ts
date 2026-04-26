import { Page } from '@playwright/test';
import { HomeLocators } from './locators/home.locators';

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  getHeader() {
    return this.page.locator(HomeLocators.header);
  }

  getNav() {
    return this.page.locator(HomeLocators.nav);
  }

  getMain() {
    return this.page.locator(HomeLocators.main);
  }
}