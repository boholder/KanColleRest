import config from "config";
import {BaseRouteUtil} from "./base-route.util.js";

class ShipCgRouteUtil {
    static #conFigKey = BaseRouteUtil.getConfigKey('ship.ship_cg');
    static route = BaseRouteUtil.concatVersionRouteWIth('ship', this.#conFigKey);
    static url = BaseRouteUtil.concatVersionUrlWith('ship', this.#conFigKey);

    static shipIdParam = config.get(`${this.#conFigKey}.param.ship_id`);
    static cgIdParam = config.get(`${this.#conFigKey}.param.cg_id`);
    static cgTypeAbbrValues = config.get(`${this.#conFigKey}.param.cg_type_abbreviation_values`);

    /*
     http://[domain]/[api version]/ship/cg?shipid={shipId}&cgid={cgId}
     */
    static buildRequestUrlWith(shipId, cgId) {
        return `${this.url}?${this.shipIdParam}=${shipId}&${this.cgIdParam}=${cgId}`;
    }

    /*
    For jest tests
    /[api version]/ship/cg?shipid={shipId}&cgid={cgId}
    */
    static buildRequestRouteWith(shipId, cgId) {
        return `${this.route}?${this.shipIdParam}=${shipId}&${this.cgIdParam}=${cgId}`;
    }
}

export {ShipCgRouteUtil};