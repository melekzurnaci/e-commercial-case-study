import { IncomingMessage, ServerResponse } from "http";
import logger from "../utils/logger";
import { BaseErrorException } from "../errors/classes/BaseException";

export function errorHandler(
  err: any,
  req: IncomingMessage,
  res: ServerResponse
) {
  logger.error({ stack: err.stack, req });

  if (err instanceof BaseErrorException) {
    res.statusCode = err.statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: err.message,
        error: err.name,
        data: err.data,
      })
    );
  } else {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}
