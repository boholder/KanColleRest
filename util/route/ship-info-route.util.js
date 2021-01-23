import config from "config";
import {BaseRouteUtil} from "./base-route.util.js";

class ShipInfoRouteUtil {
    static #conFigKey = BaseRouteUtil.getConfigKey('ship.ship_info');
    static url = BaseRouteUtil.concatUrlWith('ship', this.#conFigKey);
    static route = BaseRouteUtil.concatVersionRouteWIth('ship', this.#conFigKey);

    static shipParam = config.get(`${this.#conFigKey}.param.ship`);
    static matchFormatParam = config.get(`${this.#conFigKey}.param.match_format`);
    static matchFormatValues = config.get(`${this.#conFigKey}.param.match_format_values`);
    static responseFormatParam = config.get(`${this.#conFigKey}.param.response_format`);
    static responseFormatValues = config.get(`${this.#conFigKey}.param.response_format_values`);

    static
}

export {ShipInfoRouteUtil};