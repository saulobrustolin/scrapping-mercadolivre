import { Locator } from "@playwright/test";

export default async function getBrandName(card: Locator): Promise<string> {
    let brand = ''
    try {
        brand = await card.locator('.poly-card__content > span.poly-component__brand').innerText();
    } catch {
        brand = ''
    }
    
    return brand
}