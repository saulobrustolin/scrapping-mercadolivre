import { Locator } from "@playwright/test";

export default async function getProductLink(card: Locator): Promise<string | null> {
    const locator = await card.locator('div.poly-card__content > h3.poly-component__title-wrapper > a.poly-component__title');

    await locator.waitFor({ state: "attached" });

    const url = locator.getAttribute('href');

    return url
}