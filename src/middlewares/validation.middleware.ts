import { IncomingMessage, ServerResponse } from "http";
import { BadRequestException } from "../errors/classes";
import schema from "./schema";
import { BaseErrorException } from "../errors/classes/BaseException";
import { send } from "../utils/response";

const productValidation = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void
): void => {
  try {
    const { error } = schema.productCreatial.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    next();
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
  }
};
const productUpdate = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void
): void => {
  try {
    const { error } = schema.productCreatial.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    next();
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
  }
};
const addProduct = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void
): void => {
  try {
    const { error } = schema.addProduct.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    next();
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
  }
};
export default { productValidation, productUpdate, addProduct };
