import fs from "node:fs";
import path from "node:path";
import { Product } from "../../src/models/Product";
import { CreateProduct } from "../../src/models/classes/product";
import sequelize from "../../src/utils/database";
import { ProductTypes } from "../../src/interfaces/product";
const seedProducts = async () => {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const filePath = path.join(__dirname, "../../products.json");
    const data = fs.readFileSync(filePath, "utf8");
    const parseProducts = JSON.parse(data);

    const products = parseProducts.products.map((product: ProductTypes) => {
      return new CreateProduct(
        product.name,
        product.price,
        product.stock,
        product.description
      );
    });

    const newdata = await Product.bulkCreate(products, {
      transaction,
      validate: true,
    });

    await transaction.commit();

    console.log("Products seeded successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error seeding products:", error);
  } finally {
    await sequelize.close();
  }
};

seedProducts();
