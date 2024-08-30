export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
export interface OrderInterface {
  id: number;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
}
export enum OrderStatus {
  Created = "created",
  Canceled = "canceled",
}
