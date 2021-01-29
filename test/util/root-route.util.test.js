import {BaseRouteUtil} from "../../util/route/base-route.util.js";

test.skip('print all methods output', () => {
    let outputs = [];
    outputs.push(BaseRouteUtil.rootUrl);
    outputs.push(BaseRouteUtil.versionUrl);
    outputs.push(BaseRouteUtil.getConfigKey('test_api_key'));
    outputs.push(BaseRouteUtil.concatVersionUrlWith(
        'test_middle', 'api.v1.ship.ship_info'));
    outputs.push(BaseRouteUtil.concatVersionRouteWIth(
        'test_middle', 'api.v1.ship.ship_info'));
    console.log(outputs);
})