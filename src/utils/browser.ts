import { chromium, Browser } from 'playwright';

let browser: Browser | null = null;

export async function getBrowser() {
  if (!browser) {
    browser = await chromium.launch({ headless: true });
  }
  return browser;
}
