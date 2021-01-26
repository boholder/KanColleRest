import {ResponseSender} from "../response-sender.js";
import {BaseRouteUtil} from "../../util/route/base-route.util.js";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";
import {ShipInfoService} from "../../service/ship-info.service.js";

class ShipInfoController {
    static async getInfo(req, res) {
        if (req.query[ShipInfoRouteUtil.shipParam]) {
            await this.#checkParamsThenMatch(req, res);
        } else {
            this.#sendHint(res);
        }
    }

    static #sendHint(res) {
        let hint = {
            "document_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.info",
            "more_api": BaseRouteUtil.rootUrl
        };
        ResponseSender.sendJson(res, hint);
    }

    static async #checkParamsThenMatch(req, res) {
        let {
            shipParam,
            matchFormatParam,
            responseFormatParam
        } = this.#getParamValuesFromRequest(req);

        let {
            paramsAreLegalFlag,
            illegalParamPairs
        } = this.#checkIfParamsAreLegal(shipParam, matchFormatParam, responseFormatParam);

        if (paramsAreLegalFlag) {
            await this.#matchShipThenSend(res, matchFormatParam, shipParam, responseFormatParam);
        } else {
            ResponseSender.send400WhenRequestParamValueIllegal(res, illegalParamPairs);
        }
    }

    static #getParamValuesFromRequest(req) {
        let shipParam = req.query[ShipInfoRouteUtil.shipParam];
        // These two params have default value.
        let matchFormatParam = req.query[ShipInfoRouteUtil.matchFormatParam] || 'zh_cn';
        let responseFormatParam = req.query[ShipInfoRouteUtil.responseFormatParam] || 'json';
        return {shipParam, matchFormatParam, responseFormatParam};
    }

    static #checkIfParamsAreLegal(shipParam, matchFormatParam, responseFormatParam) {
        let paramsAreLegalFlag = true;
        let illegalParamPairs = [];
        if (!shipParam) {
            let pair = {};
            pair[ShipInfoRouteUtil.shipParam] = shipParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        if (!ShipInfoRouteUtil.matchFormatValues.includes(matchFormatParam)) {
            let pair = {};
            pair[ShipInfoRouteUtil.matchFormatParam] = shipParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        if (!ShipInfoRouteUtil.responseFormatValues.includes(responseFormatParam)) {
            let pair = {};
            pair[ShipInfoRouteUtil.responseFormatParam] = shipParam;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        return {paramsAreLegalFlag, illegalParamPairs};
    }

    static async #matchShipThenSend(res, matchFormatParam, shipParam, responseFormatParam) {
        if (matchFormatParam === 'id') {
            await ShipInfoService.matchById(res, shipParam, responseFormatParam);
        } else {
            await ShipInfoService.matchByName(res, shipParam, matchFormatParam, responseFormatParam);
        }
    }
}

export {ShipInfoController};