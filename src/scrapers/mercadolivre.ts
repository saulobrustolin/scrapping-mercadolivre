import { chromium } from 'playwright';
import { Product } from '../models/product.model';

// temp
import { writeFile } from 'fs/promises';

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
import { Logger } from '../utils/logger';
import { insertProduct } from '../db/insert';
import getQuantityInstallments from '../functions/getQuantityInstallments';
import getValueInstallments from '../functions/getValueInstallments';

// save function
async function saveCardAsHTML(html: string, index: number) {
  const fileName = `card_${index + 1}.html`;
  await writeFile(`./cards/${fileName}`, html, 'utf-8');
}

export async function scrapeMercadoLivre(url: string, logger: Logger): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector('div.items-with-smart-groups');

  const cards = await page.locator('.andes-card.poly-card.poly-card--grid-card.poly-card--large.andes-card--flat.andes-card--padding-0.andes-card--animated');
  const count = await cards.count();
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const card = cards.nth(i);
      await card.scrollIntoViewIfNeeded();

      logger.refresh(`🔎 Iniciando raspagem do produto "${i}"!`);
      logger.info(`Raspando produto: "${i + 1}"`)

      // title
      const title: string = await getTitle(card);
      logger.succeed("Título capturado!")
      // full price
      const price: number = await getPrice(card);
      logger.succeed("Preço capturado!")
      // old price
      const anchor_price: number = await getAnchorPrice(card);
      logger.succeed("Preço de ancoragem capturado!")
      // product url
      const product_url: string | null = await getProductLink(card);
      logger.succeed("Endereço do produto capturado!")
      // brand name
      const brand: string = await getBrandName(card);
      logger.succeed("Marca capturada!")
      // picture
      const picture: string | null = await getPicture(card);
      logger.succeed("Imagem capturada!")
      // bool free shipping
      const free_shipping: boolean = await getIsFreeShipping(card);
      logger.succeed("Frete grátis capturado!")
      // number stars reviews
      const stars: number | null = await getStarsReview(card);
      logger.succeed("Nota de avaliação capturada!")
      // quantity reviews
      const quantity_reviews: number | null = await getQuantityReviews(card);
      logger.succeed("Quantidade de avaliações capturada!")
      // quantity installments
      const quantity_installments: number | null = await getQuantityInstallments(card);
      logger.succeed("Quantidade de parcelas capturada!")
      // value installments
      const value_installments: number | null = await getValueInstallments(card);
      logger.succeed("Quantidade de avaliações capturada!")

      products.push({ title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars, quantity_installments, value_installments });

      logger.update('💾 Salvando produto no banco de dados...')
      insertProduct(
        title,
        price,
        anchor_price,
        product_url,
        brand,
        picture,
        free_shipping,
        quantity_reviews,
        stars,
        quantity_installments,
        value_installments
      )
      logger.succeed('📁 Produtos salvos com sucesso!');
    } catch {
      const card = cards.nth(i);
      const html = await card.innerHTML();
      await saveCardAsHTML(html, i);
      await sleep(15 * 1000);
    }
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await browser.close();
}
