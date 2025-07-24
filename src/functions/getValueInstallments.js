"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getValueInstallments;
function getValueInstallments(card) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // int
            let locator = yield card.locator('.poly-card__content > .poly-component__price > .poly-price__installments > .andes-money-amount.poly-phrase-price.andes-money-amount--cents-comma > .andes-money-amount__fraction');
            yield locator.waitFor({ state: "attached" });
            const int = yield locator.innerText();
            // cents
            let cents = '';
            try {
                cents = yield card.locator('.poly-card__content > .poly-component__price > .poly-price__installments > .andes-money-amount.poly-phrase-price.andes-money-amount--cents-comma > .andes-money-amount__cents').innerText();
            }
            catch (_a) {
                cents = '0';
            }
            // return full price
            return Number(int + "." + cents);
        }
        catch (_b) {
            return null;
        }
    });
}
