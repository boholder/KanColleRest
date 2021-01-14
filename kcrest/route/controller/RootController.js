"use strict";

function RootRoute(req, res) {
    printLog(req.ip, '/', 'GET', req.originalUrl, 200);

    // construct the response
    var response = {
        "project_url":
            "https://github.com/boholder/KanColleREST",
        "documentation_url":
            "https://github.com/boholder/KanColleREST/wiki",
        "ship_info_url": config.protocol + config.serverDomain
            + "/v1/ship/info",
        "ship_cg_url": config.protocol + config.serverDomain
            + "/v1/ship/cg",
        "equipment_info_url": config.protocol + config.serverDomain
            + "/v1/equip/info",
        "equipment_cg_url": config.protocol + config.serverDomain
            + "/v1/equip/cg"
    };

    resHead200Json(res, response);
}
