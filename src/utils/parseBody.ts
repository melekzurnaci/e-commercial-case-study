import { IncomingMessage, ServerResponse } from "http";
import { send } from "./response";
import { ERROR_CODE } from "../constants/http.constants";

export const parseJsonBody = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch (err) {
        send(ERROR_CODE.BAD_REQUEST_ERROR, "Invalid JSON", res);
        return;
      }
      next();
    });
  } else {
    req.body = {};
    next();
  }
};
