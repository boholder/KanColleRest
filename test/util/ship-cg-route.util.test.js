import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";

test.skip('print all constants & methods output', () => {
    let outputs = [];
    outputs.push(ShipCgRouteUtil.route);
    outputs.push(ShipCgRouteUtil.url);
    outputs.push(ShipCgRouteUtil.shipIdParam);
    outputs.push(ShipCgRouteUtil.cgIdParam);
    outputs.push(ShipCgRouteUtil.buildRequestUrlWith(1, 1));
    console.log(outputs);
})