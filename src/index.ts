import { scrapeMercadoLivre } from './scrapers/mercadolivre';

// logger
import { Logger } from './utils/logger';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const logger = new Logger('Iniciando...');

  for (let i = 1; i < 20; i++) {
    logger.refresh(`🔎 Iniciando raspagem da página ${i}`);

    try {
      await scrapeMercadoLivre(`https://www.mercadolivre.com.br/ofertas?promotion_type=lightning&page=${i}`, logger);
      logger.succeed('✅ Raspagem concluída!');      
    } catch (err) {
      logger.fail(`❌ Erro durante a execução: ${(err as Error).message}`);
      await sleep(30 * 1000); // 15 segundos
    }

    if (i < 20) {
      const delay = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; // entre 1 e 3 minutos
      logger.info(`⏱ Aguardando ${Math.floor(delay / 1000)} segundos antes da próxima requisição...\n`);
      await sleep(delay);
    }
  }

  logger.stop();
})();


// https://patorjk.com/software/taag/#p=testall&h=0&v=0&c=bash&f=Big%20Money-ne&t=Scrapping
// lib for style shell: ora
