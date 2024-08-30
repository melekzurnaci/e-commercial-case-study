import { MissingParameterException } from "../../errors/classes";

export class CreateProduct {
  public name!: string;
  public price!: number;
  public stock!: number;
  public description?: string;
  public productNumber!: string;
  constructor(
    name: string,
    price: number,
    stock: number,
    description?: string
  ) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description || "";
    this.setProductNumber(name);
  }

  setProductNumber(productName: string): void {
    if (!productName) {
      throw new MissingParameterException(
        "Product name is required to generate product number."
      );
    }
    this.productNumber = productName
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("");
  }
}
