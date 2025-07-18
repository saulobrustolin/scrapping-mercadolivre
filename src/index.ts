import { scrapeMercadoLivre } from './scrapers/mercadolivre';
import { saveProducts } from './services/storage.service';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 🔁 Lista de URLs diferentes (exemplo com 20 categorias diferentes)
const urls = [
  'https://www.mercadolivre.com.br/ofertas?promotion_type=lightning',
  'https://www.mercadolivre.com.br/c/tecnologia',
  'https://www.mercadolivre.com.br/c/eletrodomesticos',
  'https://www.mercadolivre.com.br/c/beleza-e-cuidado-pessoal',
  'https://www.mercadolivre.com.br/c/moda',
  'https://www.mercadolivre.com.br/c/acessorios-para-veiculos',
  'https://www.mercadolivre.com.br/c/esportes-e-fitness',
  'https://www.mercadolivre.com.br/c/ferramentas',
  'https://www.mercadolivre.com.br/c/jogos-e-brinquedos',
  'https://www.mercadolivre.com.br/c/moveis',
  'https://www.mercadolivre.com.br/c/livros',
  'https://www.mercadolivre.com.br/c/alimentos-e-bebidas',
  'https://www.mercadolivre.com.br/c/animais',
  'https://www.mercadolivre.com.br/c/construcao',
  'https://www.mercadolivre.com.br/c/instrumentos-musicais',
  'https://www.mercadolivre.com.br/c/telefonia',
  'https://www.mercadolivre.com.br/c/fotografia',
  'https://www.mercadolivre.com.br/c/automotivo',
  'https://www.mercadolivre.com.br/c/bebes',
  'https://www.mercadolivre.com.br/c/videogames'
];

(async () => {
  for (let i = 1; i < 20; i++) {
    console.log(`🔎 Requisição ${i + 1}/20`);

    try {
      const products = await scrapeMercadoLivre(`https://www.mercadolivre.com.br/ofertas?promotion_type=lightning&${i}`);
      await saveProducts(products, `mercadolivre_page_${i + 1}.json`);
    } catch (err) {
      console.error(`Erro ao raspar página ${i}`, err);
    }

    if (i < urls.length - 1) {
      const delay = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; // entre 1 e 3 minutos
      console.log(`⏱ Aguardando ${Math.floor(delay / 1000)} segundos antes da próxima requisição...\n`);
      await sleep(delay);
    }
  }

  console.log('✅ Raspagem finalizada.');
})();


// https://patorjk.com/software/taag/#p=testall&h=0&v=0&c=bash&f=Big%20Money-ne&t=Scrapping
// lib for style shell: ora
