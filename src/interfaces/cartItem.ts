export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  description?: string;
  name: string;
}
