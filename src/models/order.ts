import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";
import { OrderItem, OrderStatus } from "../interfaces/order";

class Order extends Model {
  public id!: number;
  public userId!: string;
  public status!: string;
  public items!: OrderItem[];
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(OrderStatus),
      defaultValue: OrderStatus.Created,
    },
    items: {
      type: DataTypes.JSONB, // Use JSONB for PostgreSQL or JSON for MySQL
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
