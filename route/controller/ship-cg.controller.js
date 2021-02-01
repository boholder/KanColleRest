import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";
import {BaseRouteUtil} from "../../util/route/base-route.util.js";
import {ResponseSender} from "../response-sender.js";
import ShipCgService from "../../service/ship-cg.service.js";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";

export default class ShipCgController {
    static getCg(req, res) {
        if (req.query[ShipCgRouteUtil.shipIdParam]
            && req.query[ShipCgRouteUtil.cgIdParam]) {
            this.#checkParamsThenMatch(req, res);
        } else {
            this.#sendHint(res);
        }
    }

    static #checkParamsThenMatch(req, res) {
        let shipIdParam = req.query[ShipCgRouteUtil.shipIdParam] || NaN;
        let cgIdParam = req.query[ShipCgRouteUtil.cgIdParam] || '';

        let {paramsAreLegalFlag, illegalParamPairs} =
            this.#checkIfParamsAreLegal(shipIdParam, cgIdParam);

        if (paramsAreLegalFlag) {
            ShipCgService.matchById(res, parseInt(shipIdParam), cgIdParam);
        } else {
            ResponseSender.send400WhenRequestParamValuesHaveIllegal(res, illegalParamPairs);
        }
    }

    static #checkIfParamsAreLegal(shipIdParam, cgIdParam) {
        let paramsAreLegalFlag = true;
        let illegalParamPairs = [];
        let id = parseInt(shipIdParam);

        let idIsNotANumber = isNaN(id);
        let idIsNumberButNotPositive = id <= 0
        let idIsNumberButTooBig = id ? id > 10000 : false;

        if (!shipIdParam || idIsNotANumber
            || idIsNumberButNotPositive || idIsNumberButTooBig) {

            let pair = {};
            pair[ShipInfoRouteUtil.shipParam] = shipIdParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        let cgTypeAbbreviation = (cgIdParam + '').charAt(0);
        if (!cgIdParam || !ShipCgRouteUtil.cgTypeAbbrValues.includes(cgTypeAbbreviation)) {
            let pair = {};
            pair[ShipCgRouteUtil.cgIdParam] = cgIdParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        return {paramsAreLegalFlag, illegalParamPairs};
    }

    static #sendHint(res) {
        let hint = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.cg",
            "more_api": BaseRouteUtil.rootUrl
        }
        ResponseSender.sendJson(res, hint);
    }
}