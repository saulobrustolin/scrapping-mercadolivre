import { Locator } from "@playwright/test";

export default async function getPicture(card: Locator): Promise<string | null> {
    const picture = await card.locator('div.andes-card.poly-card.poly-card--grid-card.poly-card--large.andes-card--flat.andes-card--padding-0.andes-card--animated > div.poly-card__portada > img.poly-component__picture').getAttribute('src');

    return picture
}