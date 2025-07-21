import { Locator } from "@playwright/test";

export default async function getIsFreeShipping(card: Locator): Promise<boolean> {
    let shipping = null
    try {
        const locator = await card.locator('div.poly-card__content > div.poly-component__shipping > span');

        await locator.waitFor({ state: "attached" });

        shipping = await locator.innerText();
    } catch {
        shipping = null
    }

    const isFreeShipping = shipping != null && shipping.includes("grátis") ? true : false;

    return isFreeShipping
}