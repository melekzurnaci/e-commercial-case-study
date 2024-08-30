import { BaseErrorException } from "./BaseException";
import { ERROR_CODE, ERROR_TYPE } from "../../constants/http.constants";
export class MissingParameterException extends BaseErrorException {
  constructor(message: string) {
    super(
      message,
      ERROR_CODE.MISSING_PAREMETER_ERROR,
      ERROR_TYPE.VALIDATION_ERROR
    );
  }
}
