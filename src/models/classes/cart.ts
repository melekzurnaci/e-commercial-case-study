import { CartInterface } from "../../interfaces/cart";

import { CartItem } from "./cartItem";

export class Cart implements CartInterface {
  id!: number;
  userId!: string;
  total?: number | undefined;
  items?: CartItem[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(
    id: number,
    userId: string,
    total?: number | undefined,
    items?: CartItem[] | undefined
  ) {
    this.id = id;
    this.userId = userId;
    this.total = total;
    this.items = items;
  }
}
