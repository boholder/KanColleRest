import config from "config";
import {RouteUtil} from "./route-util.js";

class ShipCgRouteUtil {
    static #apiConFigKeyPrefix = this.#concatApiConfigKeyPrefix();
    static #urlPrefix = this.#getUrlPrefix();
    static #shipIdParam = config.get(`${this.#apiConFigKeyPrefix}.param.ship_id`);
    static #cgIdParam = config.get(`${this.#apiConFigKeyPrefix}.param.cg_id`);

    static #concatApiConfigKeyPrefix() {
        // 'v1'
        let apiVersion = config.get('api.current');
        // 'api.v1.ship_cg'
        return 'api.' + apiVersion + '.ship_cg';
    }

    static #getUrlPrefix() {
        return RouteUtil.concatApiUrl(`${this.#apiConFigKeyPrefix}.route`)
    }

    static concatCgUrl(shipId, cgId) {
        // http://localhost:3000/v1/ship-cg?shipid={shipId}&cgid={cgId}
        return `${this.#urlPrefix}?${this.#shipIdParam}=${shipId}&${this.#cgIdParam}=${cgId}`;
    }
}

export {ShipCgRouteUtil};