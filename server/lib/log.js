const winston = require('winston');
const path = require('path');
const moment = require('moment');

const timezoned = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({format: timezoned}),
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/error.log'),
      level: 'error',
      maxsize: 20485760,
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/info.log'),
      maxsize: 20485760,
    })
  ]
});

const logMysql = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({format: timezoned}),
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/error_mysql.log'),
      level: 'error',
      maxsize: 20485760,
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/info_mysql.log'),
      maxsize: 20485760,
    })
  ]
});

module.exports = {
  log,
  logMysql,
};