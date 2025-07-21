import { Locator } from "@playwright/test";

export default async function getQuantityInstallments(card: Locator): Promise<number | null> {
    const locator = await card.locator('div.poly-card__content > .poly-component__price > .poly-price__installments');

    await locator.waitFor({ state: "attached" });

    const text = await locator.innerText();

    const position = text?.search('x');

    if (position && text) {
        return Number(text?.substring(position - 2, position).trim())
    }

    return 0
}