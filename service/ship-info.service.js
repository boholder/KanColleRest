import config from "config";
import {ResponseSender} from "../route/response-sender.js";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import {ShipDao} from "../db/dao/ship.dao.js";
import {DatabaseQueryExecuteError} from "../util/error.js";
import {DB_FILE_NAME} from "../db/dao/base.dao.js";

class ShipInfoService {

    static async matchById(res, shipParam, responseFormatParam) {
        // Hard code with match format param value: "id"
        // This means shipParam is an id of one ship's one model.
        // Attention: url param is string format, but id require number format.
        let id = parseInt(shipParam);
        if (id) {
            this.queryShipModelById(id, res, responseFormatParam);
        } else {
            // id is NaN, request wants to match id format but not gives "ship" param a number.
            ResponseSender.send400BadRequest(res,
                `Request asked for matching in id format, ` +
                `but ${ShipInfoRouteUtil.shipParam} param isn't a valid number: ${shipParam}`);
        }
    }

    static queryShipModelById(id, res, responseFormatParam) {
        ShipDao.getModelBy(id).then(
            value => {
                this.#checkResultThenSend([value], res, responseFormatParam);
            }, reason => {
                this.#handleFailedMatch(res, reason, id);
            }
        )
    }

    static #checkResultThenSend(shipArray, res, responseFormatParam) {
        if (shipArray && shipArray[0]) {
            // Hard code with response format param value: "json" and "img"
            this.#sendResponse(res, responseFormatParam, shipArray);
        } else {
            ResponseSender.send204NoContent(res);
        }
    }

    static #sendResponse(res, responseFormatParam, shipArray) {
        if (responseFormatParam === 'json') {
            ResponseSender.sendJson(res, shipArray);
        } else if (responseFormatParam === 'img') {
            this.#sendShipInfoImage(res, shipArray);
        }
    }

    static #sendShipInfoImage(res, shipArray) {
        let oneShipModel = shipArray[0];
        let mianImageDir = config.get('resource.image.mian_image_dir');
        let imagePath = '';
        if (oneShipModel.name && oneShipModel.name.zh_cn) {
            imagePath =
                `${mianImageDir}/ship/ship_info/${oneShipModel.name.zh_cn}1.png`;
        }
        ResponseSender.sendPngOr404DontLogError(res, imagePath);
    }

    static #handleFailedMatch(res, reason, shipParam) {
        let queryFailedInShipDbFlag =
            reason instanceof DatabaseQueryExecuteError
            && reason.db === DB_FILE_NAME.ship;

        if (queryFailedInShipDbFlag) {
            ResponseSender.send400BadRequest(res,
                `Database is corrupted (please contact with server admin) ` +
                `or Invalid match value (${ShipInfoRouteUtil.shipParam} parameter in request): ${shipParam}`);
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
        ShipDao.getModelsByQuery(query).then(
            resultArray => {
                this.#checkResultThenSend(resultArray, res, responseFormatParam);
            }, reason => {
                this.#handleFailedMatch(res, reason, shipParam);
            }
        );
    }
}

export {ShipInfoService};