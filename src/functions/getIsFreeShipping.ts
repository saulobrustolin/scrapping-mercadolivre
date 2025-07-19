import { Locator } from "@playwright/test";

export default async function getIsFreeShipping(card: Locator): Promise<boolean> {
    const element = await card.locator('div.poly-card__content > div.poly-component__shipping > span').innerText();

    const isFreeShipping = element != null && element === "Frete grátis"

    return isFreeShipping
}