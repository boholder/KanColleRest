import config from "config";
import ShipDao from "../db/dao/ship.dao.js";
import {ResponseSender} from "../route/response-sender.js";
import {DatabaseQueryExecuteError} from "../util/error.js";
import {DB_FILE_NAME} from "../db/dao/base.dao.js";
import {ShipCgRouteUtil} from "../util/route/ship-cg-route.util.js";

export default class ShipCgService {
    static matchShipById(res, id, cgIdParam) {
        return ShipDao.getIdNameBy(id).then(
            result => {
                this.#matchThenSend(res, result, cgIdParam);
            }, reason => {
                this.#handleFailedMatch(res, reason, id);
            }
        )
    }

    static #matchThenSend(res, ship, cgIdParam) {
        // "cgIdParam" are hard coded in ShipCgModel & ShipSeasonalCgModel.
        // Just want to reduce one cg type param.
        // Type abbreviation:
        // 'n' for normal cg,
        // 'e' for seasonal cg whole_body version,
        // 'd' for seasonal cg whole_body_damaged version,
        // 'a' for mian's screenshot on all cgs of one ship girl.
        // Cg number:
        // for normal cg, number is image file name,
        // for seasonal cg, number is seasonal cg id (image directory)
        // for all-in-one cg, there is no cg number,
        // and we'll search image by ship's Chinese name.
        // (because these files are named in Chinese)
        let cgTypeAbbreviation = cgIdParam.charAt(0);
        let cgNumber = cgIdParam.slice(1);
        let wctfImageDir = config.get('resource.image.wctf_image_dir');
        let imagePath = '';
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
            reason instanceof DatabaseQueryExecuteError
            && reason.db === DB_FILE_NAME.ship;

        if (queryFailedInShipDbFlag) {
            ResponseSender.send400BadRequest(res,
                `Database is corrupted (please contact with server admin) ` +
                `or Invalid match value (${ShipCgRouteUtil.shipIdParam} parameter in request):${id}`);
        } else {
            ResponseSender.send500InternalServerError(res);
        }
    }
}