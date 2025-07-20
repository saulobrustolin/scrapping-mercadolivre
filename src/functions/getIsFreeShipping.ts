import { Locator } from "@playwright/test";

export default async function getIsFreeShipping(card: Locator): Promise<boolean> {
    let shipping = null
    try {
        shipping = await card.locator('div.poly-card__content > div.poly-component__shipping > span').innerText();
    } catch {
        shipping = null
    }

    const isFreeShipping = shipping != null && shipping === "Frete grátis" ? true : false

    return isFreeShipping
}