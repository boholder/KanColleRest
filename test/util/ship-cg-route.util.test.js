import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util.js";

test('print all constants output', () => {
    let outputs = [];
    outputs.push(ShipCgRouteUtil.url);
    outputs.push(ShipCgRouteUtil.shipIdParam);
    outputs.push(ShipCgRouteUtil.cgIdParam);
    outputs.push(ShipCgRouteUtil.concatUrlWith(1, 1));
    console.log(outputs);
})