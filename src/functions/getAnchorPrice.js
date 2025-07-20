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
        // int
        const int = yield card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__fraction').innerText();
        // cents
        let cents = '';
        try {
            cents = yield card.locator('div.poly-card__content > div.poly-component__price > s.andes-money-amount.andes-money-amount--previous.andes-money-amount--cents-comma > span.andes-money-amount__cents').innerText();
        }
        catch (err) {
            cents = '0';
            console.log(err);
        }
        return Number(int) + Number(cents);
    });
}
