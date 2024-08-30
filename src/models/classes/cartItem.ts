export class CartItem {
  public id?: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public name!: string;
  constructor(
    cartId: number,
    productId: number,
    quantity: number,
    price: number,
    name: string
  ) {
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.name = name;
  }
}
