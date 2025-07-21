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
const mercadolivre_1 = require("./scrapers/mercadolivre");
// logger
const logger_1 = require("./utils/logger");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new logger_1.Logger('Iniciando...');
    for (let i = 1; i < 20; i++) {
        logger.refresh(`🔎 Iniciando raspagem da página ${i}`);
        try {
            yield (0, mercadolivre_1.scrapeMercadoLivre)(`https://www.mercadolivre.com.br/ofertas?promotion_type=lightning&page=${i}`, logger);
            logger.succeed('✅ Raspagem concluída!');
        }
        catch (err) {
            logger.fail(`❌ Erro durante a execução: ${err.message}`);
            yield sleep(30 * 1000); // 15 segundos
        }
        if (i < 20) {
            const delay = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; // entre 1 e 3 minutos
            logger.info(`⏱ Aguardando ${Math.floor(delay / 1000)} segundos antes da próxima requisição...\n`);
            yield sleep(delay);
        }
    }
    logger.stop();
}))();
// https://patorjk.com/software/taag/#p=testall&h=0&v=0&c=bash&f=Big%20Money-ne&t=Scrapping
// lib for style shell: ora
