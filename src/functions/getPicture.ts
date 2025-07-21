import { Locator } from "@playwright/test";

export default async function getPicture(card: Locator): Promise<string | null> {
    const locator = await card.locator('div.poly-card__portada > img.poly-component__picture');

    await locator.waitFor({ state: "attached" });

    let picture = await locator.getAttribute('src');

    if (picture && picture.search('https://') == -1) {
        picture = await card.locator('div.poly-card__portada > img.poly-component__picture').getAttribute('data-src');
    }

    return picture
}