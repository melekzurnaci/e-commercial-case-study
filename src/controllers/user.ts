import { IncomingMessage, ServerResponse } from "http";
import { HTTP_STATUS_CODE } from "../constants/http.constants";
import { send } from "../utils/response";

export const updateUserPermission = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  send(HTTP_STATUS_CODE.OK, {}, res);
};
