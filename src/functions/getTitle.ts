import { Locator } from "@playwright/test";

export default async function getTitle(card: Locator): Promise<string> {
    const locator = await card.locator('.poly-card__content > h3.poly-component__title-wrapper > a.poly-component__title');

    await locator.waitFor({ state: "attached" });

    const title = locator.innerText();

    return title
}