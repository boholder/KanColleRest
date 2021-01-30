import config from "config";
import ShipDao from "../db/dao/ship.dao.js";
import {ResponseSender} from "../route/response-sender.js";
import {DatabaseQueryExecuteFailError, DatabaseQueryExecuteNoResultError} from "../util/error.js";
import {DB_FILE_NAME} from "../db/dao/base.dao.js";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util";

export default class ShipCgService {
    static matchById(res, id, cgIdParam) {
        return ShipDao.getIdNameBy(id).then(
            result => this.#matchThenSend(res, result, cgIdParam),
            reason => this.#handleFailedMatch(res, reason, id)
        )
    }

    static #matchThenSend(res, ship, cgIdParam) {
        let cgTypeAbbreviation = cgIdParam.charAt(0);
        let cgNumber = cgIdParam.slice(1);
        let wctfImageDir = config.get('resource.image.wctf_image_dir');
        let imagePath = '';

        // "cgIdParam" are hard coded in ShipCgModel & ShipSeasonalCgModel.
        // Just want to reduce one cg type param.
        // Type abbreviation:
        //      'n' for normal cg,
        //      'e' for seasonal cg whole_body version,
        //      'd' for seasonal cg whole_body_damaged version,
        //      'a' for mian's screenshot on all cgs of one ship girl.
        // Cg number:
        //      for normal cg, number is image file name,
        //      for seasonal cg, number is seasonal cg id (image directory)
        //      for all-in-one cg, there is no cg number,
        //      and we'll search image by ship's Chinese name.
        //      (because these files are named in Chinese)
        switch (cgTypeAbbreviation) {
            case 'n':
                imagePath = `${wctfImageDir}/ships/${ship.id}/${cgNumber}.png`;
                ResponseSender.sendPngOr404(res, imagePath);
                break;
            case 'e':
                imagePath = `${wctfImageDir}/ships-extra/${cgNumber}/8.png`;
                ResponseSender.sendPngOr404(res, imagePath);
                break;
            case'd':
                imagePath = `${wctfImageDir}/ships-extra/${cgNumber}/9.png`;
                ResponseSender.sendPngOr404(res, imagePath);
                break;
            case'a':
                this.#sendAllInOneCg(ship, res);
                break;
            default:
                ResponseSender.send400BadRequest(res,
                    `Invalid cg id:${cgIdParam}`);
        }
    }

    static #sendAllInOneCg(ship, res) {
        let mianImageDir = config.get('resource.image.mian_image_dir');
        let imagePath = '';
        if (ship.name && ship.name.zh_cn) {
            imagePath =
                `${mianImageDir}/ship/ship_cg/${ship.name.zh_cn}2.png`;
        }
        ResponseSender.sendPngOr404DontLogError(res, imagePath);
    }

    static #handleFailedMatch(res, reason, id) {
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
                `or match value (${ShipInfoRouteUtil.shipParam}) is invalid:${id}`)
        } else {
            ResponseSender.send500InternalServerError(res);
        }
    }
}