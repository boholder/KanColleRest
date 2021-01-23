"use strict";

import express from "express";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import {ShipCgRouteUtil} from "../util/route/ship-cg-route.util.js";
import {RootController} from "./controller/root.controller.js";

const router = express.Router();

// 主页路由
router.get('/', (req, res) => {
    RootController.handle(req, res);
})

// TODO return server error HTTP code when db, model get error
// router.get(ShipInfoRouteUtil.route, async (req, res) => {
//     await ShipInfoRoute(req, res);
// });
//
// router.get(ShipCgRouteUtil.route, async (req, res) => {
//     await ShipCGRoute(req, res);
// })

// Redirect all unhandled GET request to root page.
router.get('*', function (req, res) {
    res.redirect('/');
});

export {router};