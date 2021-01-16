"use strict";

// Get config consts
const config = require('./config/config-parser.js');
// Ship functions
var shipfunc = require('./service/ShipDataCtrl');
// Equipment functions
var equipfunc = require('./service/EquipDataCtrl');
// DAO functions
var DbAccess = require('./db/DbAccess');
// TODO change mongodb to nedb https://github.com/louischatriot/nedb/
var MongoClient = require('mongodb').MongoClient;

const express = require('express');
const app = express();

// ====Configurating express application:

// For forcing re-send response rather than 304(Not Modified) when developing
if ("dev" === config.env) {
    app.disable('etag');
}

// Enable if you're behind a reverse proxy 
// (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
if (config.useProxy) {
    app.set('trust proxy', 1);
}

// Use helmet module to secure HTTP headers.
var helmet = require('helmet');
app.use(helmet());

// Use express-rate-limit to limit query rate.
const rateLimit = require("express-rate-limit");
const { printLog } = require("./util/log");
const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 100, // limit each IP to 100 requests per windowMs
    headers: false // do not send headers about this module
});
app.use(limiter);

// ====Starting server:

// Try to connect to mongodb
MongoClient.connect(config.mongodb, { useNewUrlParser: true },
    function (err, db) {
        if (err) {
            console.error('[src start] Mongodb connect failed!'
                + '\nBut you can try to launch server first.');
            console.error(err);
        }
        else {
            console.info('[src start] Mongodb connect success!');
            db.close();
        }
    })

// Start listening port
app.listen(config.serverPort, config.serverIp, function () {
    console.info('[src start] Listening on port ' + config.serverPort
        + '\n[src start] Access it via http://%s:%d',
        config.serverIp, config.serverPort);
})

app.get('/', (req, res) => {
    // Check if src IP is already blocked
    // console log
    RootRoute(req, res);
})

app.get('/v1/ship/info', (async (req, res) => {
    await ShipInfoRoute(req, res);
}));

app.get('/v1/ship/cg', (async (req, res) => {
    await ShipCGRoute(req, res);
}))

// not public, for v1/ship/cg, 
// result's image URI can be access via here and get image file.
app.get('/v1/image/ship', (async (req, res) => {
    ImageShipRoute(req, res);
}))

app.get('/v1/equip/info', (async (req, res) => {
    await EquipInfoRoute(req, res);
}))

app.get('/v1/equip/cg', (async (req, res) => {
    await EquipCGRoute(req, res);
}))

// not public, for v1/equip/cg, 
// result's image URI can be access via here and get image file.
app.get('/v1/image/equip', (async (req, res) => {
    // get paramaters
    // if paramflag->true, not a valid request
    ImageEquipRoute(req, res);
}))