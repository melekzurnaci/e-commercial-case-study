import { IncomingMessage, ServerResponse } from "http";
import ProductService from "../services/product";
import { send } from "../utils/response";
import { ERROR_TYPE, HTTP_STATUS_CODE } from "../constants/http.constants";
import { BaseErrorException } from "../errors/classes/BaseException";
import { CreateProduct } from "../models/classes/product";

export const getAllProducts = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const products = await ProductService.getAllProducts();
    send(HTTP_STATUS_CODE.OK, products, res);
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};

export const createProduct = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { name, price, stock, description } = req.body;

    const product = await ProductService.createProduct(
      new CreateProduct(name, price, stock, description)
    );
    send(HTTP_STATUS_CODE.CREATED, product, res);
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};

export const updateProduct = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    // const id = (req as any).params.id;
    const id = req.params.id;

    const query = req.body;
    const product = await ProductService.updateProductById(id, query);
    send(HTTP_STATUS_CODE.OK, { product }, res);
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};

export const deleteProduct = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const id = (req as any).params.id;

    await ProductService.deleteProductById(id);

    send(HTTP_STATUS_CODE.NO_CONTENT, {}, res);
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};
