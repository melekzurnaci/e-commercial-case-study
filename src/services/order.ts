import { BadRequestException } from "../errors/classes";
import { OrderStatus } from "../interfaces/order";
import cartRepository from "../repositories/cartRepository";
import orderRepository from "../repositories/orderRepository";

const createOrder = async (userId: string) => {
  const cart = await cartRepository.getCart(userId);
  if (!cart.items) {
    throw new BadRequestException("something went wrong", { userId });
  }

  const order = await orderRepository.createOrder(
    userId,
    OrderStatus.Created,
    cart.items,
    cart.id
  );
  return order;
};
const cancelOrder = async (id: number) => {
  const order = await orderRepository.findAndUpdate(id);
  if (!order) {
    throw new BadRequestException("something went wrong", { id });
  }

  return order;
};
export default { createOrder, cancelOrder };
