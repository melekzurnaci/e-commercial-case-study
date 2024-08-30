import AuthService from "../services/auth";
import { IncomingMessage, ServerResponse } from "http";

import { AuthCredentials } from "../interfaces/authCredentials";
import { LoginCredentials } from "../interfaces/login";
import { send } from "../utils/response";
import { ERROR_TYPE, HTTP_STATUS_CODE } from "../constants/http.constants";
import { BaseErrorException } from "../errors/classes/BaseException";

export const singup = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const authCredentials: AuthCredentials = req.body;
    const token = await AuthService.singup(authCredentials);
    send(HTTP_STATUS_CODE.OK, token, res);
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

export const singin = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const login: LoginCredentials = req.body;
    const token = await AuthService.singin(login);
    send(HTTP_STATUS_CODE.OK, token, res);
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
