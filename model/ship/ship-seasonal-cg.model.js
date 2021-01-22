import {ShipSeasonalCgTypeDao} from "../../db/dao/ship-seasonal-cg-type.dao";
import {ShipSeasonalCgDao} from "../../db/dao/ship-seasonal-cg.dao";
import {ShipCgRouteUtil} from "../../route/ship-cg-route-util";

class ShipSeasonalCgModel {
    constructor({id, type} = {}) {
        this.id = id;
        this.type = type || {};
        // Sadly ship id isn't stored in exillusts.nedb file,
        // so we need to postpone the time to build it to ShipCgModel constructing.
        // (in buildModelArrayFromShip method below)
    }

    static async build(cg = {}) {
        cg.type = await ShipSeasonalCgTypeDao.getModelBy(cg.type);
        return new ShipSeasonalCgModel(cg);
    }

    static async buildModelArrayFromShip(ship = {}) {
        let cgArray = ship.illust_extra || [];
        let result = [];
        for (let id of cgArray) {
            let cg = await ShipSeasonalCgDao.getModelBy(id);
            cg.url = {};
            cg.url.whole_body = ShipCgRouteUtil.concatCgUrl(ship.id, `e${id}`);
            cg.url.whole_body_dmged = ShipCgRouteUtil.concatCgUrl(ship.id, `d${id}`);
            result.push(cg);
        }
        return result;
    }
}

export {ShipSeasonalCgModel};