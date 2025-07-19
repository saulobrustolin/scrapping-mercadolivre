import { chromium } from 'playwright';
import { Product } from '../models/product.model';

// functions
import getPrice from '../functions/getPrice';
import getAnchorPrice from '../functions/getAnchorPrice';
import getTitle from '../functions/getTitle';
import getProductLink from '../functions/getProductLink';
import getBrandName from '../functions/getBrandName';
import getPicture from '../functions/getPicture';
import getIsFreeShipping from '../functions/getIsFreeShipping';
import getStarsReview from '../functions/getStarsReview';
import getQuantityReviews from '../functions/getQuantityReviews';

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

    // title
    const title: string = await getTitle(card);
    // full price
    const price: number = await getPrice(card);
    // old price
    const anchor_price: number = await getAnchorPrice(card);
    // product url
    const product_url: string | null = await getProductLink(card);
    // brand name
    const brand: string = await getBrandName(card);
    // picture
    const picture: string | null = await getPicture(card);
    // bool free shipping
    const free_shipping: boolean = await getIsFreeShipping(card);
    // number stars reviews
    const stars: number | null = await getStarsReview(card);
    // quantity reviews
    const quantity_reviews: number | null = await getQuantityReviews(card);

    products.push({ title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars });
  }

  await browser.close();
  return products;
}
