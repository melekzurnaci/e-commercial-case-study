import { ServerResponse } from "http";

export const send = (
  code: number = 200,
  body: {} | string = {},
  res: ServerResponse
) => {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};
