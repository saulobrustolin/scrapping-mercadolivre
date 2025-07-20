"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const BRAND = chalk_1.default.bold.blue('🛒 MERCADO LIVRE SCRAPPING BOT - by Saulo Brustolin™');
class Logger {
    constructor(initialText = 'Iniciando...') {
        this.printHeader();
        this.spinner = (0, ora_1.default)(initialText).start();
    }
    printHeader() {
        console.clear();
        console.log(`${BRAND}\n${'-'.repeat(BRAND.length)}\n`);
    }
    update(text) {
        this.spinner.text = text;
    }
    succeed(text) {
        this.spinner.succeed(text || this.spinner.text);
    }
    fail(text) {
        this.spinner.fail(text || this.spinner.text);
    }
    warn(text) {
        this.spinner.warn(text);
    }
    info(text) {
        this.spinner.info(text);
    }
    stop() {
        this.spinner.stop();
    }
    refresh(text) {
        this.spinner.stop();
        this.printHeader();
        this.spinner = (0, ora_1.default)(text).start();
    }
}
exports.Logger = Logger;
