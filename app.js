"use strict";

import config from 'config'
import {expressWinstonLogger, logger} from "./config/winston-logger.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {router} from "./route/route.js";

// TODO 如何让nedb在nodejs中持久，不重复创建（现有的static可行吗？）。
//  并发请求性能测试(基准测试)，是否要在linux服务器中做测试？
const express = require('express');
const app = express();

// Forcing re-send response rather than send 304(Not Modified)(Browser presents cached content)
//      when developing, for simulation debugging convenient.
if (process.env.NODE_ENV !== 'production') {
    app.disable('etag');
}

// Enable if you're behind a reverse proxy 
// (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
if (config.get('server.use_proxy')) {
    app.set('trust proxy', 1);
}

// Use helmet module to secure HTTP header (by removing unnecessary headers).
app.use(helmet());


// Use express-rate-limit to limit query rate.
const limiter = rateLimit({
    windowMs: config.get('express_rate_limit.window_in_milliseconds'), // 30 seconds
    max: config.get('express_rate_limit.max_query_number_per_ip_per_window'), // limit each IP to 100 requests per windowMs
    headers: false // do not send headers about express module (helmet module will also delete headers)
});
app.use(limiter);

// Use express-winston logger module
app.use(expressWinstonLogger);

// Load router
app.use(router);

// Start listening on port
const serverPort = config.get('server.port');
const serverIp = config.get('server.ip');
const serverDomain = config.get('server.domain');
app.listen(serverPort, serverIp, () => {
    logger.info(`Listening on port ${serverPort}, ip ${serverIp}.
    \n Access it via ${serverDomain}.`);
})

// TODO unfinished old api below
// // not public, for v1/ship/cg,
// // result's image URI can be access via here and get image file.
// app.get('/v1/image/ship', (async (req, res) => {
//     ImageShipRoute(req, res);
// }))
//
// app.get('/v1/equip/info', (async (req, res) => {
//     await EquipInfoRoute(req, res);
// }))
//
// app.get('/v1/equip/cg', (async (req, res) => {
//     await EquipCGRoute(req, res);
// }))
//
// // not public, for v1/equip/cg,
// // result's image URI can be access via here and get image file.
// app.get('/v1/image/equip', (async (req, res) => {
//     // get paramaters
//     // if paramflag->true, not a valid request
//     ImageEquipRoute(req, res);
// }))