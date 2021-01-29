import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";

export default class ShipInfoRequestDto {
    constructor(ship = '', matchFormat = 'zh_cn', responseFormat = 'json') {
        this.ship = ship;
        this.matchFormat = matchFormat;
        this.responseFormat = responseFormat;
    }

    static getParamsFromRequest(request) {
        let ship = request.query[ShipInfoRouteUtil.shipParam];
        // These two params have default value.
        let matchFormat = request.query[ShipInfoRouteUtil.matchFormatParam] || 'zh_cn';
        let responseFormat = request.query[ShipInfoRouteUtil.responseFormatParam] || 'json';
        return new ShipInfoRequestDto(ship, matchFormat, responseFormat);
    }
}