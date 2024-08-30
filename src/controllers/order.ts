import { ServerResponse, IncomingMessage } from "http";
import { ERROR_TYPE, HTTP_STATUS_CODE } from "../constants/http.constants";
import { BaseErrorException } from "../errors/classes/BaseException";
import { send } from "../utils/response";
import orderServices from "../services/order";
export const createOrder = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { id } = req.user;
    const order = await orderServices.createOrder(id);
    send(HTTP_STATUS_CODE.CREATED, order, res);
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

export const cancelOrder = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { id } = req.params;
    const cart = await orderServices.cancelOrder(id);
    send(HTTP_STATUS_CODE.OK, {}, res);
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
