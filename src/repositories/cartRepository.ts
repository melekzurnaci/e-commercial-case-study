import { Transaction } from "sequelize";
import { NotFoundException } from "../errors/classes";
import { CartInterface, CartItemInterface } from "../interfaces/cart";
import { Cart, CartItem } from "../models";
import sequelize from "../utils/database";
import utils from "../utils/utils";

const createCart = async (userId: string): Promise<CartInterface> => {
  return await Cart.create({ userId });
};
const findCartById = async (id: number): Promise<CartInterface> => {
  const cart = await Cart.findOne({
    where: { id },
    include: [
      {
        model: CartItem,
        as: "items",
      },
    ],
  });

  if (!cart) {
    throw new NotFoundException("cart not found..", { id });
  }
  return cart;
};
const deleteCart = async (id: number) => {
  const transaction = await sequelize.transaction();

  try {
    const cart = await Cart.findOne({
      where: { id },
      include: [
        {
          model: CartItem,
          as: "items",
        },
      ],
      transaction,
    });

    if (!cart) {
      throw new NotFoundException("cart not found..", { id });
    }

    if (cart?.items) {
      // If there are items in the cart, delete all items and the cart itself
      await CartItem.destroy({ where: { cartId: id }, transaction });
    }
    await Cart.destroy({ where: { id }, transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
const addProductToCart = async (cartItem: CartItemInterface) => {
  const transaction = await sequelize.transaction();

  try {
    const [newCartItem, created] = await CartItem.upsert(
      { ...cartItem },
      { returning: true, transaction }
    );
    const items = await getCartItemByCartId(newCartItem.cartId, transaction);
    const total = utils.getCartTotal(items);
    await Cart.update(
      { total },
      {
        where: { id: newCartItem.cartId },
        transaction,
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
const getCart = async (userId: string): Promise<CartInterface> => {
  let cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        as: "items",
      },
    ],
  });

  if (!cart) {
    return await createCart(userId);
  }

  return cart;
};

const getCartItemByCartId = async (
  cartId: number,
  transaction: Transaction
): Promise<CartItem[]> => {
  return await CartItem.findAll({
    where: { cartId },
    transaction,
  });
};

export default {
  createCart,
  findCartById,
  deleteCart,
  addProductToCart,
  getCart,
};
