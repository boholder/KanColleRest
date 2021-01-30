import {ResponseSender} from "../response-sender.js";
import {BaseRouteUtil} from "../../util/route/base-route.util.js";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";
import ShipInfoService from "../../service/ship-info.service.js";
import ShipInfoRequestDto from "../../dto/ship-info-request.dto.js";

export default class ShipInfoController {
    static getInfo(req, res) {
        if (req.query[ShipInfoRouteUtil.shipParam]) {
            this.#checkParamsThenMatch(req, res);
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

    static #checkParamsThenMatch(req, res) {
        let params = ShipInfoRequestDto.getParamsFromRequest(req);

        let {
            paramsAreLegalFlag,
            illegalParamPairs
        } = this.#checkIfParamsAreLegal(params);

        if (paramsAreLegalFlag) {
            this.#matchThenSend(res, params);
        } else {
            ResponseSender.send400WhenRequestParamValuesHaveIllegal(res, illegalParamPairs);
        }
    }

    static #checkIfParamsAreLegal({ship, matchFormat, responseFormat}) {
        let paramsAreLegalFlag = true;
        let illegalParamPairs = [];
        let matchFormatIsId = matchFormat === 'id';

        // Attention: url param is string format, but id require number format.
        let id = parseInt(ship);
        let matchFormatIsIdButIdIsNotANumber =
            matchFormatIsId && isNaN(id);

        let idIsNumberButNotPositive =
            matchFormatIsId && id <= 0

        let idIsNumberButTooBig = id ? id > 10000 : false;
        //TODO check ship should not contains special character. (escape ship string)

        if (!ship || matchFormatIsIdButIdIsNotANumber
            || idIsNumberButNotPositive || idIsNumberButTooBig) {

            let pair = {};
            pair[ShipInfoRouteUtil.shipParam] = ship;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        if (!ShipInfoRouteUtil.matchFormatValues.includes(matchFormat)) {
            let pair = {};
            pair[ShipInfoRouteUtil.matchFormatParam] = ship;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        if (!ShipInfoRouteUtil.responseFormatValues.includes(responseFormat)) {
            let pair = {};
            pair[ShipInfoRouteUtil.responseFormatParam] = ship;
            illegalParamPairs.push(pair);
            paramsAreLegalFlag = false;
        }
        return {paramsAreLegalFlag, illegalParamPairs};
    }

    static #matchThenSend(res, params) {
        // hard code match format value: id
        if (params.matchFormat === 'id') {
            ShipInfoService.matchById(res, params);
        } else {
            // matchFormatParam = ja_jp|zh_cn|en_us|ja_kana
            ShipInfoService.matchByName(res, params);
        }
    }
}