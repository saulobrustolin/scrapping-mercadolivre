import ora, { Ora } from 'ora';
import chalk from 'chalk';

const BRAND = chalk.bold.blue(`
  .▄▄ ·  ▄▄· ▄▄▄   ▄▄▄·  ▄▄▄· ▄▄▄·▪   ▐ ▄  ▄▄ • 
  ▐█ ▀. ▐█ ▌▪▀▄ █·▐█ ▀█ ▐█ ▄█▐█ ▄███ •█▌▐█▐█ ▀ ▪
  ▄▀▀▀█▄██ ▄▄▐▀▀▄ ▄█▀▀█  ██▀· ██▀·▐█·▐█▐▐▌▄█ ▀█▄
  ▐█▄▪▐█▐███▌▐█•█▌▐█ ▪▐▌▐█▪·•▐█▪·•▐█▌██▐█▌▐█▄▪▐█
   ▀▀▀▀ ·▀▀▀ .▀  ▀ ▀  ▀ .▀   .▀   ▀▀▀▀▀ █▪·▀▀▀▀     by Saulo dev
   `);

export class Logger {
    private spinner: Ora;

    constructor(initialText: string = 'Iniciando...') {
        this.printHeader();
        this.spinner = ora(initialText).start();
    }

    private printHeader() {
        console.clear();
        console.log(`${BRAND}\n${'-'.repeat(40)}\n`);
    }

    update(text: string) {
        this.spinner.text = text;
    }

    succeed(text?: string) {
        this.spinner.succeed(text || this.spinner.text);
    }

    fail(text?: string) {
        this.spinner.fail(text || this.spinner.text);
    }

    warn(text: string) {
        this.spinner.warn(text);
    }

    info(text: string) {
        this.spinner.info(text);
    }

    stop() {
        this.spinner.stop();
    }

    refresh(text: string) {
        this.spinner.stop();
        this.printHeader();
        this.spinner = ora(text).start();
    }
}
