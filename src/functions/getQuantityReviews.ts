import { Locator } from "@playwright/test";

export default async function getQuantityReviews(card: Locator): Promise<number | null> {
    const quantity_reviews = await card.locator('div.poly-card__content > div.poly-component__reviews > span.poly-reviews__total').innerText();

    const handle_string_quantity_reviews = quantity_reviews ? quantity_reviews.slice(1, -1) : null

    return Number(handle_string_quantity_reviews)
}