import config from 'config'
import winston from 'winston';
import expressWinston from 'express-winston';
import fs from "fs";

const logDirectory = config.get('log.log_directory')
// create directory if it isn't exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// https://github.com/winstonjs/winston
// - Write to all logs with level `info` and below to `kcrest-combined.log`.
const infoFileTransport = new winston.transports.File({
    filename: `${logDirectory}/kcrest-core-combined.log`,
    level: 'info',
    maxsize: 10240,
    maxFiles: 2,
    tailable: true
});
// - Write all logs error (and below) to `kcrest-error.log`.
const errorFileTransport = new winston.transports.File({
    filename: `${logDirectory}/kcrest-core-error.log`,
    level: 'error',
    maxsize: 10240, // max size 10MB
    maxFiles: 2,
    tailable: true
});

const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.errors({stack: true}),
            winston.format.json()
        ),
        transports: [infoFileTransport, errorFileTransport]
    })
;
// To avoid logger exit after record an unhandled exception.
logger.exitOnError = false;

if (process.env.NODE_ENV !== 'production') {
    // add a console transport for convenient when debugging & testing
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
    // disable logging into log files since running tests action is frequent.
    if (process.env.NODE_ENV === 'test') {
        logger.remove(infoFileTransport);
        logger.remove(errorFileTransport);
    }
}

// https://github.com/bithavoc/express-winston
const expressWinstonLogger = expressWinston.logger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.json()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "From {{req.ip}}: {{req.method}} {{req.originalUrl}} {{res.statusCode}} {{res.responseTime}}ms",
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: (req, res) => {
        if (req.originalUrl === '/favicon.ico') {
            return true;
        } else {
            return false;
        }
    },
    transports: [
        new winston.transports.File({
            filename: `${logDirectory}/kcrest-express-request.log`,
            level: 'info',
            maxsize: 10240,
            maxFiles: 2,
            tailable: true
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
})

export {logger, expressWinstonLogger};