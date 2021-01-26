import {ResponseSender} from "../response-sender.js";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";
import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";

class RootController {
    static getRoot(req, res) {
        let response = {
            "project_url":
                "https://github.com/boholder/KanColleREST",
            "document_url":
                "https://github.com/boholder/KanColleREST/wiki",
            "ship_info_url": ShipInfoRouteUtil.url,
            "ship_cg_url": ShipCgRouteUtil.url
        };
        ResponseSender.sendJson(res, response);
    }
}

export {RootController};