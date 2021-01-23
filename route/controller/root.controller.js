import {logger} from "../../config/winston-logger.js";

class RootController {
    static handle(req, res) {
        // construct the response
        let response = {
            "project_url":
                "https://github.com/boholder/KanColleREST",
            "document_url":
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
}