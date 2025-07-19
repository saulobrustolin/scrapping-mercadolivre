export interface Product {
  title: string;
  price: number;
  anchor_price: number;
  product_url: string | null;
  brand: string;
  picture: string | null;
  free_shipping: boolean;
  quantity_reviews: number | null;
  stars: number | null;
}
