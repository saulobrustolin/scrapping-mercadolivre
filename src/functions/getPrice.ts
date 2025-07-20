import { Locator } from "@playwright/test";

export default async function getPrice(card: Locator): Promise<number> {
    // int
    const int = await card.locator('div.poly-card__content > div.poly-component__price > div.poly-price__current > span.andes-money-amount.andes-money-amount--cents-superscript > span.andes-money-amount__fraction').innerText();
    
    // cents
    let cents = ''
    try {
        cents = await card.locator('div.poly-card__content > div.poly-component__price > div.poly-price__current > span.andes-money-amount.andes-money-amount--cents-superscript > span.andes-money-amount__cents.andes-money-amount__cents--superscript-24').innerText();
    } catch {
        cents = '0'
    }

    // return full price
    return Number(int) + Number(cents)
}