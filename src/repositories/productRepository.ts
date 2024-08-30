import { ConfilictErrorException, NotFoundException } from "../errors/classes";
import { CreateProductParams } from "../interfaces/createProduct";
import { Product } from "../models";

const getAllProducts = async (): Promise<Product[]> => {
  return await Product.findAll();
};

const createProduct = async (data: CreateProductParams): Promise<Product> => {
  const { name, price, stock, description, productNumber } = data;
  const product = await findProductByProductNumber(productNumber);
  if (product) {
    throw new ConfilictErrorException("Product already exists.", product);
  }
  return await Product.create({
    name,
    price,
    stock,
    description,
    productNumber,
  });
};
const findProductByProductNumber = async (
  productNumber: string
): Promise<Product | null> => {
  return await Product.findOne({
    where: { productNumber },
  });
};
const findProductById = async (id: number): Promise<Product | null> => {
  return await Product.findOne({
    where: { id },
  });
};

const updateProductById = async (
  id: number,
  data: any
): Promise<[number, Product[]]> => {
  return await Product.update(data, {
    where: { id },
    returning: true,
  });
};

const deleteProductById = async (id: number): Promise<void> => {
  const product = await findProductById(id);
  if (!product) {
    throw new NotFoundException("Product not found", { id });
  }

  await Product.destroy({
    where: { id },
  });
};
export default {
  getAllProducts,
  createProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findProductByProductNumber,
};
