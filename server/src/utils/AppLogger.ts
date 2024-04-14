import winston from "winston";

const { combine, timestamp, json } = winston.format;

const AppLogger = winston.createLogger({
  level: "http",
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), json()),
  transports: [new winston.transports.Console()],
});

export default AppLogger;
