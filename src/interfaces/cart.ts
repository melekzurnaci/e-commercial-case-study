import { CartItem } from "../models/classes/cartItem";

export interface CartInterface {
  id: number;
  userId: string;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  items?: CartItem[];
}

export interface AddProductBody {
  id: number;
  quantity: number;
}

export interface CartItemInterface {
  id?: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
}
