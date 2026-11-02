import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger.helper';

/**
 * BasePage: Core wrapper providing resilient, self-healing browser interactions,
 * explicit waits, element logging, and automated screenshot capture.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL path (relative to baseURL or absolute)
   */
  async navigate(path: string = ''): Promise<void> {
    Logger.step(`Navigating to: ${path || '/'}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Click an element with automatic visibility check and logging
   */
  async click(locator: Locator, description: string = 'element'): Promise<void> {
    Logger.step(`Clicking on: ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Fill text into input field
   */
  async fill(locator: Locator, text: string, description: string = 'input'): Promise<void> {
    Logger.step(`Filling [${description}] with: "${text}"`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  /**
   * Press a keyboard key on an element
   */
  async pressKey(locator: Locator, key: string, description: string = 'element'): Promise<void> {
    Logger.step(`Pressing key [${key}] on [${description}]`);
    await locator.waitFor({ state: 'visible' });
    await locator.press(key);
  }

  /**
   * Get trimmed text content of an element
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.textContent();
    return (text || '').trim();
  }

  /**
   * Check if element is visible on page
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Assert page title matches expected string or regex
   */
  async expectTitle(titleOrRegex: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titleOrRegex);
  }

  /**
   * Assert current page URL contains expected string or regex
   */
  async expectURL(urlOrRegex: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlOrRegex);
  }

  /**
   * Capture a full-page screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    Logger.info(`Capturing screenshot: ${name}`);
    return await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}
