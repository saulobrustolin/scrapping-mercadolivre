import { Locator } from "@playwright/test";

export default async function getValueInstallments(card: Locator): Promise<number | null> {
    try {
        // int
        let locator = await card.locator('.poly-card__content > .poly-component__price > .poly-price__installments > .andes-money-amount.poly-phrase-price.andes-money-amount--cents-comma > .andes-money-amount__fraction');
    
        await locator.waitFor({ state: "attached" })
    
        const int = await locator.innerText();
        
        // cents
        let cents = ''
        try {
            cents = await card.locator('.poly-card__content > .poly-component__price > .poly-price__installments > .andes-money-amount.poly-phrase-price.andes-money-amount--cents-comma > .andes-money-amount__cents').innerText();
        } catch {
            cents = '0'
        }
    
        // return full price
        return Number(int + "." + cents)
    } catch {
        return null
    }
}