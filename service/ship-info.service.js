import config from "config";
import {ResponseSender} from "../route/response-sender.js";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import ShipDao from "../db/dao/ship.dao.js";
import {DatabaseQueryExecuteError, ModelBuildError} from "../util/error.js";
import {DB_FILE_NAME} from "../db/dao/base.dao.js";

export default class ShipInfoService {
    static matchById(res, {ship: id, responseFormat}) {
        // Hard code with match format param value: "id"
        // This means shipParam is an id of one ship's one model.
        return ShipDao.getModelBy(parseInt(id)).then(
            result => {
                // wrap result into array to maintain consistency with name query result.
                this.#checkIdResultThenSend(res, [result], responseFormat);
            }, reason => {
                this.#handleFailedMatch(res, reason, id);
            }
        );
    }

    static #checkIdResultThenSend(res, shipArray, responseFormat) {
        // When db query by id matches nothing,
        // id query will be null and shipArray will be [null]
        let idQueryReturnsTrusthy = shipArray[0] && Object.entries(shipArray[0]).length > 0;
        if (shipArray.length === 1 && idQueryReturnsTrusthy) {
            this.#sendResponse(res, shipArray, responseFormat);
        } else {
            ResponseSender.send204NoContent(res);
        }
    }

    static #sendResponse(res, shipArray, responseFormatParam) {
        // Hard code with response format param value: "json" and "img"
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
                `Error occurred when querying ship database. ` +
                `Maybe ship database is corrupted (please contact with server admin) ` +
                `or match value (${ShipInfoRouteUtil.shipParam}) matched nothing:${shipParam}`);
        } else if (reason instanceof ModelBuildError) {
            ResponseSender.send400BadRequest(res,
                `Error occurred when building result form query result. ` +
                `Maybe ship database is corrupted (please contact with server admin) ` +
                `or match value (${ShipInfoRouteUtil.shipParam}) is invalid:${shipParam}`);
        } else {
            ResponseSender.send500InternalServerError(res);
        }
    }

    static matchByName(res, params) {
        // This means shipParam is a name format.
        // Hard code with rest of format param values
        let query = this.#buildNameQuery(params.ship, params.matchFormat);
        return ShipDao.getModelsBy(query).then(
            resultArray => {
                this.#checkNameResultThenSend(res, resultArray, params);
            }, reason => {
                this.#handleFailedMatch(res, reason, params.ship);
            }
        );
    }

    static #buildNameQuery(shipParam, matchFormatParam) {
        let nameKey = `name.${matchFormatParam}`;
        let nameValue = shipParam;

        if (matchFormatParam === 'en_us') {
            // ship name have ja_romaji format,
            // which is lowercase letters of "English name"
            nameKey = `name.ja_romaji`;
            nameValue = shipParam.toLowerCase();
        }

        // example: nameKey = name.ja_romaji, shipParam = "Yamato" -> "yamato"
        let query = {};
        query[nameKey] = nameValue;
        return query;
    }

    static #checkNameResultThenSend(res, shipArray, params) {
        if (shipArray.length > 0) {
            this.#sendResponse(res, shipArray, params.responseFormat);
        } else {
            // match format is name, try to send suggest instead of 204
            this.#tryToGetSimilarNamesThenSendSuggest(res, params);
        }
    }

    /*
    When match format is a name format,
        return similar ship names as suggest based on shipParam & match format,
        instead of just return [204 No Content].
     */
    static #tryToGetSimilarNamesThenSendSuggest(res, {ship, matchFormat}) {
        let fuzzyShipName = `.*${ship}.*`;
        let query = this.#buildNameQuery(fuzzyShipName, matchFormat);
        ShipDao.getNamesBy(query).then(
            nameModelArray => {
                this.#checkSimilarNamesResultThenSend(res, nameModelArray, matchFormat);
            }, reason => {
                this.#handleFailedMatch(res, reason, ship);
            }
        )
    }

    static #checkSimilarNamesResultThenSend(res, names, matchFormatParam) {
        if (names.length !== 0) {
            let similarNames = [];
            for (let name of names) {
                similarNames.push(name[matchFormatParam]);
            }
            ResponseSender.send204NoContent(res,
                `Found no result under exact match. ` +
                `Here are all similar valid ship names:${similarNames}`);
        } else {
            ResponseSender.send204NoContent(res);
        }
    }
}