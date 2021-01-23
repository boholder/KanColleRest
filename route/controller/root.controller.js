import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";
import {ResponseSender} from "../response-sender.js";

class RootController {
    static handle(req, res) {
        // construct the response
        let response = {
            "project_url":
                "https://github.com/boholder/KanColleREST",
            "document_url":
                "https://github.com/boholder/KanColleREST/wiki",
            "ship_info_url": ShipInfoRouteUtil.url
        };

        ResponseSender.sendJson(res, response);
    }
}

export {RootController};