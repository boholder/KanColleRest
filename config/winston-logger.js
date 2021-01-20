import winston from 'winston';
import expressWinston from 'express-winston';

// https://github.com/winstonjs/winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.json()
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `kcrest-combined.log` and print them on console.
        // - Write all logs error (and below) to `kcrest-error.log`.
        //
        new winston.transports.File({
            filename: '../data/log/kcrest-error.log',
            level: 'error',
            maxsize: 10240,
            maxFiles: 2,
            tailable: true
        }),
        new winston.transports.File({
            filename: '../data/log/kcrest-combined.log',
            level: 'info',
            maxsize: 10240,
            maxFiles: 2,
            tailable: true
        })
    ]
});
// To avoid logger exit after record an unhandled exception.
logger.exitOnError = false;

// https://github.com/bithavoc/express-winston
const expressWinstonLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: '../data/log/kcrest-express-request.log',
            level: 'info',
            maxsize: 1024,
            maxFiles: 2,
            tailable: true
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "From {req.ip}: {{req.method}} [HTTP {{res.statusCode}}] {{req.originalUrl}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export {logger, expressWinstonLogger};