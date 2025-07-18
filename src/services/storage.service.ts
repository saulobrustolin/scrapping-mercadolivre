import { Product } from '../models/product.model';
import fs from 'fs/promises';
import path from 'path';

export async function saveProducts(products: Product[], filename: string) {
  const filePath = path.join('data', filename);
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`📦 Salvo: ${filePath}`);
}
