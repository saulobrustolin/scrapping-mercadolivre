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
exports.insertProduct = insertProduct;
const db_1 = require("./db");
function insertProduct(title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.openDb)();
        yield db.run(`
    INSERT INTO products (title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars]);
    });
}
