import { ERROR_TYPE, ERROR_CODE } from "../../constants/http.constants";
import { BaseErrorException } from "./BaseException";
class ConfilictErrorException extends BaseErrorException {
  constructor(message: string, data?: {}) {
    super(
      message,
      ERROR_CODE.BAD_REQUEST_ERROR,
      ERROR_TYPE.BAD_REQUEST_ERROR,
      data
    );
  }
}

export { ConfilictErrorException };
