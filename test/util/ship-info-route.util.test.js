import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util.js";

test.skip('print all constants & methods output', () => {
    let outputs = [];
    outputs.push(ShipInfoRouteUtil.route);
    outputs.push(ShipInfoRouteUtil.url);
    outputs.push(ShipInfoRouteUtil.shipParam);
    outputs.push(ShipInfoRouteUtil.matchFormatParam);
    outputs.push(ShipInfoRouteUtil.matchFormatValues);
    outputs.push(ShipInfoRouteUtil.responseFormatParam);
    outputs.push(ShipInfoRouteUtil.responseFormatValues);
    console.log(outputs);
})