import { NotFoundException } from "../errors/classes/NotFoundException";
import { CreateProductParams } from "../interfaces/createProduct";
import productRepository from "../repositories/productRepository";
const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const createProduct = async (productData: CreateProductParams) => {
  return await productRepository.createProduct(productData);
};

const findProductById = async (id: number) => {
  const product = await productRepository.findProductById(id);
  if (!product) {
    throw new NotFoundException("Product not found", { id });
  }
  return product;
};

const updateProductById = async (id: number, query: any) => {
  const product = await findProductById(id);
  if (!product) {
    throw new NotFoundException("Product not found", {
      query,
      id,
    });
  }

  return await productRepository.updateProductById(id, query);
};

const deleteProductById = async (id: number) => {
  await findProductById(id);
  return await productRepository.deleteProductById(id);
};
export default {
  getAllProducts,
  createProduct,
  findProductById,
  updateProductById,
  deleteProductById,
};
