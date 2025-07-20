import { scrapeMercadoLivre } from './scrapers/mercadolivre';
import { saveProducts } from './services/storage.service';

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
      const products = await scrapeMercadoLivre(`https://www.mercadolivre.com.br/ofertas?promotion_type=lightning&page=${i}`, logger);
      logger.succeed('✅ Raspagem concluída!');
      
      logger.update('💾 Salvando produtos...');
      await saveProducts(products, `mercadolivre_page_${i}.json`);
      logger.succeed('📁 Produtos salvos com sucesso!');
    } catch (err) {
      logger.fail(`❌ Erro durante a execução: ${(err as Error).message}`);
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
