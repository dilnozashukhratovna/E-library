import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File({ filename: 'log/error.log', level: 'error' }),
    new transports.File({ filename: 'log/combine.log', level: 'info' }),
  ],
});

if (logger) {
  logger.exceptions.handle(
    new transports.File({ filename: 'log/exception.log' }),
  );

  logger.rejections.handle(
    new transports.File({ filename: 'log/rejections.log' }),
  );

  logger.exitOnError = false;
} else {
  console.error('Logger initialization failed!');
}

export default logger;
