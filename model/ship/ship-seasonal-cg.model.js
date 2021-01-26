import {ShipSeasonalCgTypeDao} from "../../db/dao/ship-seasonal-cg-type.dao.js";
import {ShipSeasonalCgDao} from "../../db/dao/ship-seasonal-cg.dao.js";
import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";
import {ModelBuildError} from "../../util/error.js";
import {logger} from "../../config/winston-logger.js";

class ShipSeasonalCgModel {
    constructor({id, type} = {}) {
        this.id = id;
        this.type = type || {};
        // Sadly ship id isn't stored in exillusts.nedb file,
        // so we need to postpone the time to build it to ShipCgModel constructing.
        // (in buildModelArrayFromShip method below)
    }

    static async build(cg = {}) {
        try {
            return await this.#buildModel(cg);
        } catch (e) {
            logger.error(
                new ModelBuildError('ShipSeasonalCgModel', e).toString()
            );
            return new ShipSeasonalCgModel(cg);
        }
    }

    static async #buildModel(cg) {
        cg.type = await ShipSeasonalCgTypeDao.getModelBy(cg.type);
        return new ShipSeasonalCgModel(cg);
    }

    static async buildModelArrayFromShip(ship = {}) {
        let cgArray = ship.illust_extra || [];
        let result = [];
        for (let id of cgArray) {
            let cg = await ShipSeasonalCgDao.getModelBy(id);
            cg.url = {};
            // hard code cg id
            cg.url.whole_body = ShipCgRouteUtil.concatUrlWith(ship.id, `e${id}`);
            cg.url.whole_body_dmged = ShipCgRouteUtil.concatUrlWith(ship.id, `d${id}`);
            result.push(cg);
        }
        return result;
    }
}

export {ShipSeasonalCgModel};