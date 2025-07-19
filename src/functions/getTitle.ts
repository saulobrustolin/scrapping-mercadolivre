import { Locator } from "@playwright/test";

export default async function getTitle(card: Locator): Promise<string> {
    const title = await card.locator('.poly-card__content > h3.poly-component__title-wrapper > a.poly-component__title').innerText();

    return title
}