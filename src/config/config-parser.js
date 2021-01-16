"use strict";
/*
 * Read configurations from serverconfig.json file, provide consts to other functions.
 * Modify them in config.json if you need.
 */
import { readFileSync } from "fs";

const configFile = "src/config/config.json";
var configFromFile;

try {
    configFromFile = JSON.parse(readFileSync(configFile));
} catch (err) {
    console.error(
        "ERROR Cannot read or parse configurations from config file: " + err);
}

const config = {
    // Environment config, 
    // it will change express applicaiton setting.
    // For example, I disable etag for forcing re-send response rather than 304(Not Modified),
    // so I can dynamically check response content after changing code.
    env: configFromFile.environment || "prod",
    // Mongodb url
    // example format: mongodb://user:passwd@ip:dbport/dbname
    mongodb: configFromFile.resource.datasource.mongodb || "mongodb://localhost:27017/src",
    // Server ip
    serverIp: configFromFile.server.ip || "127.0.0.1",
    // Which port to listen
    serverPort: configFromFile.server.port || 3000,
    // Domain default localhost:3000
    serverDomain: configFromFile.server.domain || "localhost:" + port,
    // Kancolle game image resource path
    imagePath: configFromFile.resource.image_dir_path || "./data/image",
    // HTTPS or HTTP when running express app
    protocol: configFromFile.server.use_TLS == true ? "https://" : "http://",
    // Proxy or not when running express app
    useProxy: configFromFile.server.use_proxy || false
}

export default config;