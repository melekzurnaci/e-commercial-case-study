const ERROR_TYPE = {
  BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR",
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
  CONFILICT_ERROR: "CONFILICT_ERROR",
  STOCK_OUT_ERROR: "STOCK_OUT_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};
const ERROR_CODE = {
  BAD_REQUEST_ERROR: 400,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND_ERROR: 404,
  CONFILICT_ERROR: 409,
  MISSING_PAREMETER_ERROR: 422,
  STOCK_OUT_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export { ERROR_TYPE, ERROR_CODE, HTTP_STATUS_CODE };
