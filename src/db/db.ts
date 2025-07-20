import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Habilita Promises no sqlite3
sqlite3.verbose();

export async function openDb() {
  return open({
    filename: './data/mercadolivre_products.db',
    driver: sqlite3.Database
  });
}
