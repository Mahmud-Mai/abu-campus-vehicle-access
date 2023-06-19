import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  // const logMsg = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;

  // logEvents(logMsg, "errLog.log");
  console.log("Custom Error middleware: ", err);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status).json({ message: err.message });
  next();
};

export default errorHandler;
