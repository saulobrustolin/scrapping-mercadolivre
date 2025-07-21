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
exports.default = getPrice;
function getPrice(card) {
    return __awaiter(this, void 0, void 0, function* () {
        // int
        let locator = yield card.locator('.poly-card__content > .poly-component__price > .poly-price__current > .andes-money-amount.andes-money-amount--cents-superscript > .andes-money-amount__fraction');
        yield locator.waitFor({ state: "attached" });
        const value_int = yield locator.innerText();
        // tratament
        const int = value_int.replace(/\./g, "");
        // cents
        const centsLocator = card.locator('.andes-money-amount__cents.andes-money-amount__cents--superscript-24');
        const hasCents = yield centsLocator.isVisible();
        const cents = hasCents ? yield centsLocator.innerText() : '0';
        // return full price
        return Number(int + "." + cents);
    });
}
