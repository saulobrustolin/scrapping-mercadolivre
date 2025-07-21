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
exports.default = getPicture;
function getPicture(card) {
    return __awaiter(this, void 0, void 0, function* () {
        const locator = yield card.locator('div.poly-card__portada > img.poly-component__picture');
        yield locator.waitFor({ state: "attached" });
        let picture = yield locator.getAttribute('src');
        if (picture && picture.search('https://') == -1) {
            picture = yield card.locator('div.poly-card__portada > img.poly-component__picture').getAttribute('data-src');
        }
        return picture;
    });
}
