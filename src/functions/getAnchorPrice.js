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
exports.default = getAnchorPrice;
function getAnchorPrice(card) {
    return __awaiter(this, void 0, void 0, function* () {
        const locator = yield card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__fraction');
        yield locator.waitFor({ state: "attached" });
        // int
        const value_int = yield locator.innerText();
        // tratament
        const int = value_int.replace(/\./g, "");
        // cents
        let cents = '';
        try {
            cents = yield card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__cents').innerText();
        }
        catch (_a) {
            cents = '0';
        }
        return Number(int + "." + cents);
    });
}
