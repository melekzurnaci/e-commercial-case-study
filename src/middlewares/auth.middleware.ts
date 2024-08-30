import { IncomingMessage, ServerResponse } from "http";
import { BaseErrorException } from "../errors/classes/BaseException";
import { ERROR_CODE, ERROR_TYPE } from "../constants/http.constants";
import AuthService from "../services/auth";
import { send } from "../utils/response";

const extractTokenFromHeader = (req: IncomingMessage) => {
  const authorization = req.headers["authorization"];
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }

  return null;
};
const authenticationMiddleware = async (
  req: IncomingMessage & { user?: any },
  res: ServerResponse,
  next: () => void
) => {
  try {
    const authorization = extractTokenFromHeader(req);

    if (!authorization) {
      throw new BaseErrorException(
        "Unauthorized",
        ERROR_CODE.UNAUTHORIZED_ERROR,
        ERROR_TYPE.UNAUTHORIZED_ERROR
      );
    }

    const user = await AuthService.getUser(authorization);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};

const adminPermission = async (
  req: IncomingMessage & { user?: any },
  res: ServerResponse,
  next: () => void
) => {
  const authorization = extractTokenFromHeader(req);

  if (!authorization) {
    throw new BaseErrorException(
      "Unauthorized",
      ERROR_CODE.UNAUTHORIZED_ERROR,
      ERROR_TYPE.UNAUTHORIZED_ERROR
    );
  }

  try {
    const user = await AuthService.getUser(authorization);
    req.user = user;

    if (user.permission !== "admin") {
      throw new BaseErrorException(
        "Forbidden",
        ERROR_CODE.FORBIDDEN_ERROR,
        ERROR_TYPE.FORBIDDEN_ERROR
      );
    }
    next();
  } catch (err) {
    if (err instanceof BaseErrorException) {
      send(err.statusCode, err.message, res);
    }
    send(
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPE.INTERNAL_SERVER_ERROR,
      res
    );
  }
};

export default {
  authenticationMiddleware,
  adminPermission,
};
