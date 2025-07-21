import { Locator } from "@playwright/test";

export default async function getBrandName(card: Locator): Promise<string> {
    let brand = ''
    try {
        const locator = await card.locator('.poly-card__content > span.poly-component__brand');

        await locator.waitFor({ state: "attached" });

        brand = await locator.innerText();
    } catch {
        brand = ''
    }
    
    return brand
}