"use strict";

import express from "express";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import {ShipCgRouteUtil} from "../util/route/ship-cg-route.util.js";

const router = express.Router();

// 主页路由
router.get('/', (req, res) => {
    RootRoute(req, res);
})

// TODO return server error HTTP code when db, model get error
router.get(ShipInfoRouteUtil.route, (async (req, res) => {
    await ShipInfoRoute(req, res);
}));

router.get(ShipCgRouteUtil.route, (async (req, res) => {
    await ShipCGRoute(req, res);
}))

export {router};