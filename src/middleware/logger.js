

const winston = require("winston");
const fs = require("fs");

const logDir = "log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { format } = winston;

// const timeFormat = () => (new Date()).toLocaleTimeString();
const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: `${logDir}/error.log`, level: "error", format: format.combine(
        format.json(),
        format.timestamp()
      )
    }),
    new winston.transports.File({
      filename: `${logDir}/combined.log`, format: format.combine(
        format.json(),
        format.timestamp()
      )
    }),

  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
// if (env !== "production") {
logger.add(new winston.transports.Console({
  format: winston.format.simple()
}));
// }

module.exports = logger; 