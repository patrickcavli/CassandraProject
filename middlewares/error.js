const httpsstatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = httpsstatus.INTERNAL_SERVER_ERROR;
    message = httpsstatus[httpsstatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = { errorHandler };
