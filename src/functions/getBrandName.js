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
exports.default = getBrandName;
function getBrandName(card) {
    return __awaiter(this, void 0, void 0, function* () {
        let brand = '';
        try {
            const locator = yield card.locator('.poly-card__content > span.poly-component__brand');
            yield locator.waitFor({ state: "attached" });
            brand = yield locator.innerText();
        }
        catch (_a) {
            brand = '';
        }
        return brand;
    });
}
