import { Locator } from "@playwright/test";

export default async function getPrice(card: Locator): Promise<number> {
    // int
    let locator = await card.locator('.poly-card__content > .poly-component__price > .poly-price__current > .andes-money-amount.andes-money-amount--cents-superscript > .andes-money-amount__fraction');

    await locator.waitFor({ state: "attached" })

    const value_int = await locator.innerText();

    // tratament
    const int = value_int.replace(/\./g, "");

    // cents
    const centsLocator = card.locator('.andes-money-amount__cents.andes-money-amount__cents--superscript-24');

    const hasCents = await centsLocator.isVisible();
    const cents = hasCents ? await centsLocator.innerText() : '0';

    // return full price
    return Number(int + "." + cents)
}