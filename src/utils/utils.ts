import { CartItem } from "../interfaces/cartItem";

const getMethodAndPath = (route: any): { method: string; path: string } => {
  const indexOfFirst = route.indexOf(":");
  const method = route.slice(0, indexOfFirst);
  const path = route.slice(indexOfFirst + 1);
  return { method, path };
};

const getCartTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    return (acc += item.quantity * item.price);
  }, 0);
};
export default { getMethodAndPath, getCartTotal };
