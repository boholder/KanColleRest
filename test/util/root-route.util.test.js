import {RootRouteUtil} from "../../route/util/root-route.util.js";

test.skip('print all methods output', () => {
    let outputs = [];
    outputs.push(RootRouteUtil.getRootUrl());
    outputs.push(RootRouteUtil.getVersionedUrl());
    outputs.push(RootRouteUtil.concatVersionedUrlWith('api'));
    console.log(outputs);
})