import config from "config";
import {RootRouteUtil} from "./root-route.util.js";

class ShipCgRouteUtil {
    static #conFigKey = RootRouteUtil.getConfigKey('ship.ship_cg');
    static url = RootRouteUtil.concatUrlWith('ship', this.#conFigKey);
    static shipIdParam = config.get(`${this.#conFigKey}.param.ship_id`);
    static cgIdParam = config.get(`${this.#conFigKey}.param.cg_id`);

    // for ShipCgModel cg urls building
    static concatUrlWith(shipId, cgId) {
        // http://localhost:3000/v1/ship/cg?shipid={shipId}&cgid={cgId}
        return `${this.url}?${this.shipIdParam}=${shipId}&${this.cgIdParam}=${cgId}`;
    }
}

export {ShipCgRouteUtil};