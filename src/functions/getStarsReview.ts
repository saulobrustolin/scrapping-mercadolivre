import { Locator } from "@playwright/test";

export default async function getStarsReview(card: Locator): Promise<number | null> {
    const locator = await card.locator('div.poly-card__content > div.poly-component__reviews > span.poly-reviews__rating');

    await locator.waitFor({ state: "attached" });

    const stars = await locator.innerText();

    return Number(stars)
}