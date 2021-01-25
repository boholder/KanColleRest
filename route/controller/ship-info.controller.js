import {ResponseSender} from "../response-sender.js";
import {BaseRouteUtil} from "../../util/route/base-route.util.js";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";
import {ShipDao} from "../../db/dao/ship.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error.js";
import {DB_FILE_NAME} from "../../db/dao/base.dao.js";

class ShipInfoController {
    static async getInfo(req, res) {
        if (req.query[ShipInfoRouteUtil.shipParam]) {
            await this.checkParamsAndMatch(req, res);
        } else {
            this.sendHint(res);
        }
    }

    static sendHint(res) {
        let hint = {
            "document_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.info",
            "more_api": BaseRouteUtil.rootUrl
        };
        ResponseSender.sendJson(res, hint);
    }

    static async checkParamsAndMatch(req, res) {
        let {
            shipParam,
            matchFormatParam,
            responseFormatParam
        } = this.getParamValuesFromRequest(req);

        let {
            paramsAreLegalFlag,
            illegalParamPairs
        } = this.checkIfParamsAreLegal(shipParam, matchFormatParam, responseFormatParam);

        if (paramsAreLegalFlag) {
            await this.matchShip(matchFormatParam, res, shipParam, responseFormatParam);
        } else {
            ResponseSender.send400WhenRequestParamValueIllegal(res, illegalParamPairs);
        }
    }

    static getParamValuesFromRequest(req) {
        let shipParam = req.query[ShipInfoRouteUtil.shipParam];
        // These two params have default value.
        let matchFormatParam = req.query[ShipInfoRouteUtil.matchFormatParam] || 'zh_cn';
        let responseFormatParam = req.query[ShipInfoRouteUtil.responseFormatParam] || 'json';
        return {shipParam, matchFormatParam, responseFormatParam};
    }

    static checkIfParamsAreLegal(shipParam, matchFormatParam, responseFormatParam) {
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

    static async matchShip(matchFormatParam, res, shipParam, responseFormatParam) {
        // TODO response image
        if (matchFormatParam === 'id') {
            await this.matchById(res, shipParam, responseFormatParam);
        } else {
            await this.matchByName(res, shipParam, matchFormatParam, responseFormatParam);
        }
    }

    static async matchById(res, shipParam, responseFormatParam) {
        // Hard code with match format param value: "id"
        // This means shipParam is an id of one ship's one model.
        // Attention: url param is string format, but id require number format.
        let id = parseInt(shipParam);
        if (id) {
            ShipDao.getModelBy(parseInt(shipParam)).then(
                value => {
                    if (value) {
                        // Hard code with response format param value: "json" and "image"
                        // TODO unfinished
                        ResponseSender.sendJson(res, [value]);
                    } else {
                        ResponseSender.send204NoContent(res);
                    }
                }, reason => {
                    this.handleFailedMatch(res, reason, shipParam);
                }
            )
        } else {
            // id is NaN, request wants to match id format but not gives "ship" param a number.
            ResponseSender.send400BadRequest(res,
                `Request asked to match in id format, ` +
                `but ${ShipInfoRouteUtil.shipParam} param isn't a valid number: ${shipParam}`);
        }
    }

    static handleFailedMatch(res, reason, shipParam) {
        let queryFailedInShipDbFlag =
            reason instanceof DatabaseQueryExecuteError
            && reason.db === DB_FILE_NAME.ship;

        if (queryFailedInShipDbFlag) {
            ResponseSender.send400BadRequest(res,
                `Invalid match value(ship parameter in request): ${shipParam}`);
        } else {
            ResponseSender.send500InternalServerError(res);
        }
    }

    static async matchByName(res, shipParam, matchFormatParam, responseFormatParam) {
        // Hard code with rest of format param values
        // This means shipParam is a name format.
        let nameKey = `name.${matchFormatParam}`;
        let query = {};
        // example: nameKey = name.en_us, shipParam = "Yamato"
        query[nameKey] = shipParam;
        // TODO fuzz matching?
        ShipDao.getModelsByQuery(query).then(
            value => {
                ResponseSender.sendJson(res, value);
            }, reason => {
                this.handleFailedMatch(res, reason, shipParam);
            }
        );
    }
}

export {ShipInfoController};