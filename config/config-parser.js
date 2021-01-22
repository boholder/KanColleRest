"use strict";
import config from 'config';

// First I manually get config from json file, now I use node-config module
// https://github.com/lorenwest/node-config
// Leaving this file there only for comments explain each field,
//      once document is done, I should remove it.

// works when config is called in other file, but not works on this file
let server = config.get('server') || {};
let expressRateLimit = config.get('express_rate_limit') || {};
let resource = config.get('resource') || {};
let datasource = config.get('resource.datasource') || {};

const CONFIG = {
    // nedb file directory
    datasource: {
        nedbFileDir: datasource.nedb_database_file_dir || 'NO NEDB FILE DIRECTORY IN CONFIG',
        nedbFileName: datasource.nedb_file_names || {}
    },

    server: {
        // Server ip
        ip: server.ip || "127.0.0.1",
        // Which port to listen
        port: server.port || 3000,
        // Domain default localhost:3000
        domain: server.domain || "localhost:" + port,
        // HTTPS or HTTP when running express app
        protocol: (server.use_TLS && server.use_TLS === true) ? "https://" : "http://",
        // Proxy or not when running express app
        useProxy: (server.use_proxy && server.use_proxy === true) ? true : false
    },

    // Kancolle game image resource directory
    imagePath: resource.image_dir || "NO IMAGE FILE DIRECTORY IN CONFIG",

    // express_rate_limit
    expressRateLimit: {
        // default window time is 30ms * 1000 = 30s
        windowTime: expressRateLimit.window_in_milliseconds || 30000,
        // as variable name shows
        queryLimit: expressRateLimit.max_query_number_per_ip_per_window || 100
    }
}