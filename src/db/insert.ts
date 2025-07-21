import { openDb } from './db';

export async function insertProduct(
    title: string,
    price: number,
    anchor_price: number,
    product_url: string | null,
    brand: string,
    picture: string | null,
    free_shipping: boolean,
    quantity_reviews: number | null,
    stars: number | null,
    quantity_installments: number | null,
    value_installments: number | null
) {
    const db = await openDb();

    await db.run(`
    INSERT INTO products (title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars, quantity_installments, value_installments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [title, price, anchor_price, product_url, brand, picture, free_shipping, quantity_reviews, stars, quantity_installments, value_installments]);
}
