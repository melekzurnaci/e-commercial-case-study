import { IncomingMessage, ServerResponse } from "http";
import { BaseErrorException } from "../errors/classes/BaseException";
import { ERROR_TYPE, HTTP_STATUS_CODE } from "../constants/http.constants";
import { send } from "../utils/response";
import cartService from "../services/cart";
import logger from "../utils/logger";

export const addProductToCart = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { id } = req.user;
    const product = req.body;
    await cartService.addProductToCart(id, product);
    const cart = await cartService.getCartDetailByUserId(id);
    send(HTTP_STATUS_CODE.OK, cart, res);
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

export const getCart = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.params.id;

    const cart = await cartService.getCart(id);
    send(HTTP_STATUS_CODE.OK, cart, res);
  } catch (err) {
    logger.error({ stack: err, req });
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

export const deleteCart = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const id = req.params.id;
    await cartService.deleteCart(id);
    send(HTTP_STATUS_CODE.OK, {}, res);
  } catch (err) {
    logger.error({ stack: err, req });
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
