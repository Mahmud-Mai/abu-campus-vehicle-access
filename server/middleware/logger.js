import * as fs from "fs";
import path from "path";

const fsPromises = fs.promises;

export const logEvents = async (message, fileName) => {
  const dateTime = new Date().toLocaleDateString;
  const logItem = ` ${dateTime} \t ${message} \n`;

  try {
    if (!fileName.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "logFileName"),
      logItem
    );
  } catch (error) {
    console.log({ message: error });
  }
};

export const logger = (req, res, next) => {
  const logMsg = `${req.url} \t ${req.method} \t ${req.headers.origin}`;
  logEvents(logMsg, "reqLog.log");
  next();
};
