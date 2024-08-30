import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export class CartItem extends Model {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public name!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "carts", key: "id" },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cart_items",
    indexes: [
      {
        unique: true,
        fields: ["cartId", "productId"],
      },
    ],
  }
);
