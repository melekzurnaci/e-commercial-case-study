import { StockOutException } from "../errors/classes/StockOutErrorException";
import { AddProductBody, CartInterface } from "../interfaces/cart";
import { Cart } from "../models/classes/cart";
import { CartItem } from "../models/classes/cartItem";
import cartRepository from "../repositories/cartRepository";
import productService from "./product";

const createCart = async (userId: string): Promise<CartInterface> => {
  return await cartRepository.createCart(userId);
};
const addProductToCart = async (id: string, item: AddProductBody) => {
  const product = await productService.findProductById(item.id);
  const cart = await cartRepository.getCart(id);
  if (item.quantity > product.stock) {
    throw new StockOutException(`${product.name} is stock out.`, { item });
  }

  await cartRepository.addProductToCart(
    new CartItem(
      cart.id,
      product.id,
      item.quantity,
      product.price,
      product.name
    )
  );
};
const getCart = async (id: number): Promise<CartInterface> => {
  const cart = await cartRepository.findCartById(id);

  return new Cart(cart.id, cart.userId, cart.total, cart.items);
};
const deleteCart = async (id: number) => {
  await cartRepository.findCartById(id);
  return await cartRepository.deleteCart(id);
};
const getCartDetailByUserId = async (id: string) =>
  await cartRepository.getCart(id);
export default {
  createCart,
  getCart,
  deleteCart,
  addProductToCart,
  getCartDetailByUserId,
};
