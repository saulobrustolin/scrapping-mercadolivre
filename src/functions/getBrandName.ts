import { Locator } from "@playwright/test";

export default async function getBrandName(card: Locator): Promise<string> {
    const seller_name = await card.locator('.poly-card__content > span.poly-component__brand').innerText();
    
    return seller_name
}