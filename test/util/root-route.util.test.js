import {BaseRouteUtil} from "../../util/route/base-route.util.js";

test.skip('print all methods output', () => {
    let outputs = [];
    outputs.push(BaseRouteUtil.getRootUrl());
    outputs.push(BaseRouteUtil.getVersionUrl());
    outputs.push(BaseRouteUtil.concatVersionUrlWith('api'));
    console.log(outputs);
})