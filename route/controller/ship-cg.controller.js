import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";
import {BaseRouteUtil} from "../../util/route/base-route.util.js";
import {ResponseSender} from "../response-sender.js";
import ShipCgService from "../../service/ship-cg.service.js";

export default class ShipCgController {
    static getCg(req, res) {
        if (req.query[ShipCgRouteUtil.shipIdParam]) {
            this.#checkParamsThenMatch(req, res);
        } else {
            this.#sendHint(res);
        }
    }

    static #checkParamsThenMatch(req, res) {
        let shipIdParam = req.query[ShipCgRouteUtil.shipIdParam];
        let cgIdParam = req.query[ShipCgRouteUtil.cgIdParam];

        let {paramsAreLegalFlag, illegalParamPairs} =
            this.#getParamValuesFromRequest(shipIdParam, cgIdParam);

        if (paramsAreLegalFlag) {
            this.#checkShipIdIsValidNumberThenMatch(res, shipIdParam, cgIdParam);
        } else {
            ResponseSender.send400WhenRequestParamValuesHaveIllegal(res, illegalParamPairs);
        }
    }

    static #getParamValuesFromRequest(shipIdParam, cgIdParam) {
        let paramsAreLegalFlag = true;
        let illegalParamPairs = [];
        let shipIdIsNotAValidNumber = !shipIdParam || !parseInt(shipIdParam);
        if (shipIdIsNotAValidNumber) {
            let pair = {};
            pair[ShipCgRouteUtil.shipIdParam] = shipIdParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        if (!cgIdParam) {
            let pair = {};
            pair[ShipCgRouteUtil.cgIdParam] = cgIdParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        return {paramsAreLegalFlag, illegalParamPairs};
    }

    static #checkShipIdIsValidNumberThenMatch(res, shipIdParam, cgIdParam) {
        let id = parseInt(shipIdParam);
        if (id) {
            ShipCgService.matchShipById(res, id, cgIdParam);
        } else {
            // id is NaN, request wants to match id format but not gives "ship" param a number.
            ResponseSender.send400BadRequest(res,
                `${ShipCgRouteUtil.shipIdParam} param isn't a valid number: ${shipIdParam}`);
        }
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