import { BadRequestException } from "../errors/classes";
import { OrderStatus } from "../interfaces/order";
import Order from "../models/order";
import cartRepository from "./cartRepository";

const createOrder = async (
  userId: string,
  status: OrderStatus,
  items: any,
  cartId: number
): Promise<Order> => {
  const order = await Order.create({ userId, status, items });
  await cartRepository.deleteCart(cartId);
  return order;
};

const getOrder = async (id: number) => {
  return await Order.findByPk(id);
};
const findAndUpdate = async (id: number) => {
  const order = await getOrder(id);
  if (!order) {
    throw new BadRequestException("Order not found", { orderId: id });
  }
  if (order.status === OrderStatus.Canceled) {
    throw new BadRequestException("Order status still canceled...");
  }
  return await Order.update(
    { status: OrderStatus.Canceled },
    { where: { id } }
  );
};
export default { createOrder, getOrder, findAndUpdate };
