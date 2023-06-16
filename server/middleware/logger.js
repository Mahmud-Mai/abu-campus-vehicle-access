import "fs";
import path from "path";
import { format } from "date-fns";
import { uuid } from "uuid";

const fsPromises = fs.promises;

const logEvents = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyyMMdd \t HH:mm:ss");
  const logItem = ` ${dateTime} \t uuid() \t ${message} \n`;

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
