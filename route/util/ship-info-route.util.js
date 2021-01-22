import config from "config";
import {RootRouteUtil} from "./root-route.util.js";

class ShipInfoRouteUtil {
    static #conFigKey = RootRouteUtil.getConfigKey('ship.ship_info');
    static url = RootRouteUtil.concatUrlWith('ship', this.#conFigKey);
    static shipParam = config.get(`${this.#conFigKey}.param.ship`);
    static matchFormatParam = config.get(`${this.#conFigKey}.param.match_format`);
    static matchFormatValues = config.get(`${this.#conFigKey}.param.match_format_values`);
    static responseFormatParam = config.get(`${this.#conFigKey}.param.response_format`);
    static responseFormatValues = config.get(`${this.#conFigKey}.param.response_format_values`);
}

export {ShipInfoRouteUtil};