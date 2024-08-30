import { ERROR_TYPE, ERROR_CODE } from "../../constants/http.constants";
import { BaseErrorException } from "./BaseException";
class NotFoundException extends BaseErrorException {
  constructor(message: string, data?: {}) {
    super(
      message,
      ERROR_CODE.NOT_FOUND_ERROR,
      ERROR_TYPE.NOT_FOUND_ERROR,
      data
    );
  }
}

export { NotFoundException };
