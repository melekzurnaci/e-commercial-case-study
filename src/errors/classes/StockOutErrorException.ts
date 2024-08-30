import { ERROR_TYPE, ERROR_CODE } from "../../constants/http.constants";
import { BaseErrorException } from "./BaseException";
class StockOutException extends BaseErrorException {
  constructor(message: string, data?: {}) {
    super(
      message,
      ERROR_CODE.STOCK_OUT_ERROR,
      ERROR_TYPE.STOCK_OUT_ERROR,
      data
    );
  }
}

export { StockOutException };
