import { Locator } from "@playwright/test";

export default async function getAnchorPrice(card: Locator): Promise<number> {
    // int
    const int = await card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__fraction').innerText();

    // cents
    let cents = ''
    try {
        cents = await card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__cents').innerText();
    } catch {
        cents = '0'
    }

    return Number(int) + Number(cents)
}