import config from "config";
import {BaseRouteUtil} from "./base-route.util.js";

class ShipInfoRouteUtil {
    static #conFigKey = BaseRouteUtil.getConfigKey('ship.ship_info');
    static url = BaseRouteUtil.concatVersionUrlWith('ship', this.#conFigKey);
    static route = BaseRouteUtil.concatVersionRouteWIth('ship', this.#conFigKey);

    static shipParam = config.get(`${this.#conFigKey}.param.ship`);
    static matchFormatParam = config.get(`${this.#conFigKey}.param.match_format`);
    static matchFormatValues = config.get(`${this.#conFigKey}.param.match_format_values`);
    static responseFormatParam = config.get(`${this.#conFigKey}.param.response_format`);
    static responseFormatValues = config.get(`${this.#conFigKey}.param.response_format_values`);

    /*
   http://[domain]/[api version]/ship/cg?ship={ship}&matchfmt={matchFormat}&resfmt={responseFormat}
   */
    static buildRequestUrlWith(ship, matchFormat = 'zh_cn', responseFormat = 'json') {
        return `${this.url}?${this.shipParam}=${ship}&${this.matchFormatParam}=${matchFormat}` +
            `&${this.responseFormatParam}=${responseFormat}`;
    }

    /*
    For jest tests, translate non-ascii characters to url format.
   /[api version]/ship/cg?ship={ship}&matchfmt={matchFormat}&resfmt={responseFormat}
   */
    static buildRequestRouteWith(ship, matchFormat = 'zh_cn', responseFormat = 'json') {
        return encodeURI(`${this.route}?${this.shipParam}=${ship}&${this.matchFormatParam}=${matchFormat}` +
            `&${this.responseFormatParam}=${responseFormat}`);
    }
}

export {ShipInfoRouteUtil};