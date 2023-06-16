import { logger } from "./logger";

export const errorHandler = (err, req, res, next) => {
  const logMsg = `${err.name} \t ${err.message} \t ${req.method} \t ${req.url} \t ${req.headers.origin} \t`;

  logEvents(logMsg, "errLog.log");

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: err.message });
};
