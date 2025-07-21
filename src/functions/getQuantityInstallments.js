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
exports.default = getQuantityInstallments;
function getQuantityInstallments(card) {
    return __awaiter(this, void 0, void 0, function* () {
        const locator = yield card.locator('div.poly-card__content > .poly-component__price > .poly-price__installments');
        yield locator.waitFor({ state: "attached" });
        const text = yield locator.innerText();
        const position = text === null || text === void 0 ? void 0 : text.search('x');
        if (position && text) {
            return Number(text === null || text === void 0 ? void 0 : text.substring(position - 2, position).trim());
        }
        return 0;
    });
}
