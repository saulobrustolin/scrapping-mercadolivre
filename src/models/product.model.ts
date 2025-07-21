export interface Product {
  title: string;
  price: number;
  anchor_price: number;
  product_url: string | null;
  brand: string | null;
  picture: string | null;
  free_shipping: boolean;
  quantity_reviews: number | null;
  stars: number | null;
  quantity_installments: number | null;
  value_installments: number | null;
}
