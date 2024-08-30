import { ERROR_TYPE, ERROR_CODE } from "../../constants/http.constants";
import { BaseErrorException } from "./BaseException";
class BadRequestException extends BaseErrorException {
  constructor(message: string, data?: {}) {
    super(
      message,
      ERROR_CODE.CONFILICT_ERROR,
      ERROR_TYPE.CONFILICT_ERROR,
      data
    );
  }
}

export { BadRequestException };
