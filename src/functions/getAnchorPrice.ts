import { Locator } from "@playwright/test";

export default async function getAnchorPrice(card: Locator): Promise<number> {
    const locator = await card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__fraction');
    
    await locator.waitFor({ state: "attached" });
    
    // int
    const value_int = await locator.innerText();

    // tratament
    const int = value_int.replace(/\./g, "");

    // cents
    let cents = ''
    try {
        cents = await card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__cents').innerText();
    } catch {
        cents = '0'
    }

    return Number(int + "." + cents)
}