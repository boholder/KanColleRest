"use strict";

/**
 * Print query log to console.
 * example:
 * {"time": "2019-5-31 11:01:27",
 * "source_ip": "127.0.0.1",
 * "queried_api": "/v1/ship/cg",
 * "request_http_method": "GET",
 * "url_params": "match=z1"
 * "response_http_code": 200}
 */
function recordQueryLog(sourceIp, queriedApi, requestHttpMethod, urlParams, responseHttpCode) {
    const logJson = {
        "time": new Date().toLocaleString(),
        "source_ip": sourceIp,
        "queried_api": queriedApi,
        "request_http_method": requestHttpMethod,
        "url_params": { urlParams },
        "response_http_code": responseHttpCode
    };
    console.log(logJson);
}

module.exports = {
    recordQueryLog
}
