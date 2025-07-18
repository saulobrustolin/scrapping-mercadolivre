export interface Product {
  title: string;
  price: string;
  product_url: string;
  quantity_reviews: number;
  stars: number;
  seller: string | null;
  free_shipping: boolean;
  pictures: string;
}
