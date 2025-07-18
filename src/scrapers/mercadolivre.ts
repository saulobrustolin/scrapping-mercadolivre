import { chromium } from 'playwright';
import { Product } from '../models/product.model';

export async function scrapeMercadoLivre(url: string): Promise<Product[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector('.andes-card.poly-card.poly-card--grid-card.poly-card--large.andes-card--flat.andes-card--padding-0.andes-card--animated');

  const cards = await page.locator('.andes-card.poly-card.poly-card--grid-card.poly-card--large.andes-card--flat.andes-card--padding-0.andes-card--animated');
  const count = await cards.count();
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);

    const title = await card.locator('.poly-card__content .poly-component__title-wrapper .poly-component__title').innerText();
    const price = await card.locator('.andes-money-amount--cents-superscript').innerText();
    const product_url = await card.locator('.poly-card__content h3.poly-component__title-wrapper a.poly-component__title').getAttribute('href');
    const seller = '';
    const picture = '';
    const free_shipping = true;
    const stars = 5;
    const quantity_reviews = 5;

    products.push({ title, price, (product_url ?? ''), quantity_reviews, stars, seller, free_shipping, picture });
  }

  await browser.close();
  return products;
}
