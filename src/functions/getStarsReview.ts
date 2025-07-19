import { Locator } from "@playwright/test";

export default async function getStarsReview(card: Locator): Promise<number | null> {
    const stars = await card.locator('div.poly-card__content > div.poly-component__reviews > span.poly-reviews__rating').innerText();

    return Number(stars)
}