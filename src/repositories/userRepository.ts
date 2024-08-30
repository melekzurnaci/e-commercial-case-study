import { AuthCredentials } from "../interfaces/authCredentials";
import { Cart, CartItem, User } from "../models";
const findUserById = async (id: string): Promise<User | null> => {
  return await User.findOne({
    where: { id },
  });
};

const findUserWithCart = async (id: string): Promise<User | null> => {
  return await User.findOne({
    where: { id },
    include: [
      {
        model: Cart,
        as: "cart",
        include: [
          {
            model: CartItem,
            as: "items",
          },
        ],
      },
    ],
  });
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

const createUser = async (user: AuthCredentials) => {
  return await User.create({ ...user });
};
export default {
  findUserById,
  findUserWithCart,
  createUser,
  findUserByEmail,
};
