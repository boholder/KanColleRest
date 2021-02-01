"use strict";

import config from 'config'
import {expressWinstonLogger} from "./config/winston-logger.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {router} from "./route/route.js";
import express from "express";

export const app = express();

// TODO 并发请求性能测试(基准测试)，是否要在linux服务器中做测试？
// TODO 如果能把所有资源改成网络链接？

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

// Use helmet module to secure HTTP header
// (by removing unnecessary headers which maybe abused for XSS attack).
app.use(helmet());


// Use express-rate-limit to limit query rate.
const limiter = rateLimit({
    windowMs: config.get('express_rate_limit.window_in_milliseconds'), // 30 seconds
    max: config.get('express_rate_limit.max_query_number_per_ip_per_window'), // limit each IP to 100 requests per windowMs
    headers: false // do not send headers about express module
});
app.use(limiter);

// Use express-winston logger module
app.use(expressWinstonLogger);

// Load router
app.use(router);

