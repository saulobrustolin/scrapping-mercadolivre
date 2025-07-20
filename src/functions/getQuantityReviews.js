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
exports.default = getQuantityReviews;
function getQuantityReviews(card) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity_reviews = yield card.locator('div.poly-card__content > div.poly-component__reviews > span.poly-reviews__total').innerText();
        const handle_string_quantity_reviews = quantity_reviews ? quantity_reviews.slice(1, -1) : null;
        return Number(handle_string_quantity_reviews);
    });
}
