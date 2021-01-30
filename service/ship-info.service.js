import config from "config";
import {ResponseSender} from "../route/response-sender.js";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import ShipDao from "../db/dao/ship.dao.js";
import {DatabaseQueryExecuteFailError, DatabaseQueryExecuteNoResultError, ModelBuildError} from "../util/error.js";
import {DB_FILE_NAME} from "../db/dao/base.dao.js";

export default class ShipInfoService {
    static matchById(res, {ship: id, responseFormat}) {
        // Hard code with match format param value: "id", response format "json", "img"
        // This means shipParam is an id of one ship's one model.
        if (responseFormat === 'json') {
            return this.#getModelById(res, id, responseFormat);
        } else if (responseFormat === 'img') {
            return this.#onlyGetIdNameById(res, id, responseFormat);
        }
    }

    static #getModelById(res, id, responseFormat) {
        return ShipDao.getModelBy(parseInt(id)).then(
            // wrap result into array to maintain consistency with name query result.
            result => this.#sendResponse(res, [result], responseFormat),
            reason => this.#handleFailMatch(res, reason, id)
        );
    }

    static #onlyGetIdNameById(res, id, responseFormat) {
        // ensure ship zh_cn name won't be appended suffix so we can concat image path
        return ShipDao.getIdNameBy(parseInt(id)).then(
            // wrap result into array to maintain consistency with name query result.
            result => this.#sendResponse(res, [result], responseFormat),
            reason => this.#handleFailMatch(res, reason, id)
        );
    }

    static #sendResponse(res, shipArray, responseFormatParam) {
        // Hard code with response format param value: "json" and "img"
        if (responseFormatParam === 'json') {
            ResponseSender.sendJson(res, shipArray);
        } else if (responseFormatParam === 'img') {
            this.#sendImage(res, shipArray);
        }
    }

    static #sendImage(res, shipArray) {
        let oneShipModel = shipArray[0];
        let imagePath = this.#buildImagePath(oneShipModel);
        ResponseSender.sendPngOr404DontLogError(res, imagePath);
    }

    static #buildImagePath(oneShipModel) {
        let mianImageDir = config.get('resource.image.mian_image_dir');
        let imagePath = 'ship_model_is_not_have_zh_cn_name_so_cant_build_image_path';
        if (oneShipModel.name && oneShipModel.name.zh_cn) {
            imagePath =
                `${mianImageDir}/ship/ship_info/${oneShipModel.name.zh_cn}1.png`;
        }
        return imagePath;
    }

    static #handleFailMatch(res, reason, shipParam) {
        let queryFailedInShipDbFlag =
            reason instanceof DatabaseQueryExecuteFailError
            && reason.db === DB_FILE_NAME.ship + '.nedb';

        let matchesNothingInShipDbFlag =
            reason instanceof DatabaseQueryExecuteNoResultError
            && reason.db === DB_FILE_NAME.ship + '.nedb';

        if (queryFailedInShipDbFlag) {
            ResponseSender.send400BadRequest(res,
                `Ship database(processed by nedb) rejected query. ` +
                `Maybe ship database is corrupted, please contact with server admin.`);
        } else if (matchesNothingInShipDbFlag) {
            ResponseSender.send404NotFound(res,
                `Request matches nothing in ship database. ` +
                `Maybe ship database is corrupted (lost this ship's relative records) ` +
                `or match value (${ShipInfoRouteUtil.shipParam}) is invalid:${shipParam}`)
        } else if (reason instanceof ModelBuildError) {
            ResponseSender.send400BadRequest(res,
                `Error occurred when building result form query result. ` +
                `Maybe ship database is corrupted (some data in relative records are incorrect) ` +
                `or match value (${ShipInfoRouteUtil.shipParam}) is invalid:${shipParam}`);
        } else {
            ResponseSender.send500InternalServerError(res);
        }
    }

    static matchByName(res, params) {
        // This means shipParam is a name format.
        // Hard code with rest of format param values except "id"
        let query = this.#buildNameQuery(params.ship, params.matchFormat);
        let responseFormat = params.responseFormat;
        if (responseFormat === 'json') {
            return this.#getModelsByName(res, query, params);
        } else if (responseFormat === 'img') {
            return this.#getRawJsonsByName(res, query, params);
        }
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

    static #getModelsByName(res, query, params) {
        return ShipDao.getModelsBy(query).then(
            resultArray => this.#sendResponse(res, resultArray, params.responseFormat),
            reason => this.#sendSuggestionOrHandleReject(res, reason, params)
        );
    }

    static #getRawJsonsByName(res, query, params) {
        // ensure ship zh_cn name won't be appended suffix so we can concat image path
        return ShipDao.getRawJsonsBy(query).then(
            resultArray => this.#sendResponse(res, resultArray, params.responseFormat),
            reason => this.#sendSuggestionOrHandleReject(res, reason, params)
        );
    }

    static #sendSuggestionOrHandleReject(res, reason, params) {
        if (reason instanceof DatabaseQueryExecuteNoResultError) {
            this.#tryToGetSimilarNamesThenSendSuggestion(res, params);
        } else {
            this.#handleFailMatch(res, reason, params.ship);
        }
    }

    /*
    When match format is a name format,
        return similar ship names as suggest based on shipParam & match format,
        instead of just return [204 No Content].
     */
    static #tryToGetSimilarNamesThenSendSuggestion(res, {ship, matchFormat}) {
        let query = this.#buildNameQuery(ship, matchFormat);
        // replace query
        let key = Object.entries(query)[0][0];
        let fuzzyShipName = new RegExp(`.*${ship}.*`);
        let fuzzyQuery = {};
        fuzzyQuery[key] = {$regex: fuzzyShipName}
        ShipDao.getNamesBy(fuzzyQuery).then(
            nameModelArray => this.#sendSuggestion(res, nameModelArray, matchFormat),
            reason => this.#handleFailMatch(res, reason, ship)
        )
    }

    static #sendSuggestion(res, names, matchFormatParam) {
        let similarNames = new Set();
        for (let name of names) {
            similarNames.add(name[matchFormatParam])
        }
        ResponseSender.send404NotFound(res,
            `Found no result under exact match. ` +
            `Here are all similar valid ship names:` +
            `${JSON.stringify([...similarNames])}`);
    }
}