import { OrderItem, OrderStatus } from "../../interfaces/order";

export class Order {
  public id!: number;
  public userId!: string;
  public status!: OrderStatus;
  public items!: OrderItem[];
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor(userId: string, status: OrderStatus, items: OrderItem[]) {
    this.userId = userId;
    this.status = status;
    this.items = items;
  }
}
