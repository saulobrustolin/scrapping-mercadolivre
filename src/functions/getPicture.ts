import { Locator } from "@playwright/test";

export default async function getPicture(card: Locator): Promise<string | null> {
    const picture = await card.locator('div.poly-card__portada > img.poly-component__picture').getAttribute('src');

    return picture
}