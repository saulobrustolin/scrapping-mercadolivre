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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeMercadoLivre = scrapeMercadoLivre;
const playwright_1 = require("playwright");
// functions
const getPrice_1 = __importDefault(require("../functions/getPrice"));
const getAnchorPrice_1 = __importDefault(require("../functions/getAnchorPrice"));
const getTitle_1 = __importDefault(require("../functions/getTitle"));
const getProductLink_1 = __importDefault(require("../functions/getProductLink"));
const getBrandName_1 = __importDefault(require("../functions/getBrandName"));
const getPicture_1 = __importDefault(require("../functions/getPicture"));
const getIsFreeShipping_1 = __importDefault(require("../functions/getIsFreeShipping"));
const getStarsReview_1 = __importDefault(require("../functions/getStarsReview"));
const getQuantityReviews_1 = __importDefault(require("../functions/getQuantityReviews"));
function scrapeMercadoLivre(url, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield playwright_1.chromium.launch({ headless: true });
        const context = yield browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            viewport: { width: 1280, height: 800 },
        });
        const page = yield context.newPage();
        yield page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
        yield page.waitForSelector('div.items-with-smart-groups');
        const cards = yield page.locator('.andes-card.poly-card.poly-card--grid-card.poly-card--large.andes-card--flat.andes-card--padding-0.andes-card--animated');
        const count = yield cards.count();
        const products = [];
        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            logger.refresh(`🔎 Iniciando raspagem do produto "${i}"!`);
            logger.info(`Raspando produto: "${i}"`);
            // title
            const title = yield (0, getTitle_1.default)(card);
            logger.succeed("Título capturado!");
            // full price
            const price = yield (0, getPrice_1.default)(card);
            logger.succeed("Preço capturado!");
            // old price
            const anchor_price = yield (0, getAnchorPrice_1.default)(card);
            logger.succeed("Preço de ancoragem capturado!");
            // product url
            const product_url = yield (0, getProductLink_1.default)(card);
            logger.succeed("Endereço do produto capturado!");
            // brand name
            const brand = yield (0, getBrandName_1.default)(card);
            logger.succeed("Marca capturada!");
            // picture
            const picture = yield (0, getPicture_1.default)(card);
            logger.succeed("Imagem capturada!");
            // bool free shipping
            const free_shipping = yield (0, getIsFreeShipping_1.default)(card);
            logger.succeed("Frete grátis capturado!");
            // number stars reviews
            const stars = yield (0, getStarsReview_1.default)(card);
            logger.succeed("Nota de avaliação capturada!");
            // quantity reviews
            const quantity_reviews = yield (0, getQuantityReviews_1.default)(card);
            logger.succeed("Quantidade de avaliações capturada!");
            products.push({ title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars });
        }
        yield browser.close();
        return products;
    });
}
