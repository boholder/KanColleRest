#!/usr/bin/env node

import config from "config";
import {logger} from "./config/winston-logger.js";
import {app} from "./app.js";

// Start listening on port
const serverPort = config.get('server.port');
const serverIp = config.get('server.ip');
const serverDomain = config.get('server.domain');
app.listen(serverPort, serverIp, () => {
    logger.info(`Listening on port ${serverPort}, ip ${serverIp}. Access it via ${serverDomain}.`);
})