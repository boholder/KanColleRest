"use strict";

import express from "express";
import {ShipInfoRouteUtil} from "../util/route/ship-info-route.util.js";
import {ShipCgRouteUtil} from "../util/route/ship-cg-route.util.js";
import {RootController} from "./controller/root.controller.js";
import {ShipController} from "./controller/ship.controller.js";

const router = express.Router();

router.get('/', (req, res) => {
    RootController.getRoot(req, res);
})

router.get(ShipInfoRouteUtil.route, async (req, res) => {
    await ShipController.getInfo(req, res);
});

router.get(ShipCgRouteUtil.route, async (req, res) => {
    await ShipController.getCg(req, res);
});

// TODO unfinished old api below
// // not public, for v1/ship/cg,
// // result's image URI can be access via here and get image file.
// app.get('/v1/image/ship', (async (req, res) => {
//     ImageShipRoute(req, res);
// }))
//
// app.get('/v1/equip/info', (async (req, res) => {
//     await EquipInfoRoute(req, res);
// }))
//
// app.get('/v1/equip/cg', (async (req, res) => {
//     await EquipCGRoute(req, res);
// }))
//
// // not public, for v1/equip/cg,
// // result's image URI can be access via here and get image file.
// app.get('/v1/image/equip', (async (req, res) => {
//     // get paramaters
//     // if paramflag->true, not a valid request
//     ImageEquipRoute(req, res);
// }))

// Redirect all unhandled GET request to root page.
router.get('*', (req, res) => {
    res.redirect('/');
});

export {router};