import { Cart } from "./cart";
import { CartItem } from "./cartItem";
import { Product } from "./product";
import User from "./user";

User.hasOne(Cart, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "cart",
});

Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
export { Cart, CartItem, Product, User };
