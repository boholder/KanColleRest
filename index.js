/*
 * This js handles requests and deal with them, it's the first one .
*/
// ==========================import&config START============================

// =============self defined START==============
// get config consts
const config = require('./FunctionModule/config')
// ship functions
var shipfunc = require('./FunctionModule/ShipDataCtrl');
// equipment functions
var equipfunc = require('./FunctionModule/EquipDataCtrl');
// DAO functions
var DbAccess = require('./FunctionModule/DbAccess');
// =============self defined END==============

// =============other module START==============

// 1.js file system module
var fs = require('fs');

// 2.mongodb for data store
var MongoClient = require('mongodb').MongoClient;

// 3.express for request router
const express = require('express');
const app = express();
// for not reply 304(http signal code, "Not Modified") automatically,
// so I can send 204 or so
app.disable('etag');
// Enable if you're behind a reverse proxy 
// (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
if (!(config.proxy === 0))
    app.set('trust proxy', 1);

// 4.use helmet module for security.
var helmet = require('helmet');
app.use(helmet());

// 5.use express-rate-limit for query rate limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 100, // limit each IP to 100 requests per windowMs
    headers: false // do not send headers about this module
});
app.use(limiter);

// =============other module END==============

// ==========================import&config END=============================

// ==========================part functions START==========================

// print out query log on console
// {"time": "2019-5-31 11:01:27", "srcip": "127.0.0.1", 
// "api": "/v1/ship/cg", "method": "GET", "url": "match=z1"}
function printLog(srcip, api, method, url, rescode) {
    var time = new Date();
    console.log('{"time": "' + time.toLocaleString()
        + '", "srcip": "' + srcip
        + '", "api": "' + api
        + '", "method": "' + method
        + '", "url": "' + url
        + '", "rescode": ' + rescode + '"}');
}

function makeShipJsonResMsg(ships) {
    var code = 600;
    var msg = 'Response only contains one ship\'s data';
    // flag to mark if `ships` 
    // contains more than one ship's data or not
    var flag = false;
    // if not, determine `ships` contains 
    // more than one ship's data or not
    try {
        var name1 = ships[0].name.zh_cn;
    }
    catch (err) {
        console.error(err);
    }
    if (name1 !== ships[ships.length - 1].name.zh_cn)
        flag = true;
    if (flag) {
        code = 601;
        msg = 'You sent a fuzzy request '
            + 'so response contains more than one ship\'s data';
    }
    return { code, msg };
}

function makeEquipJsonResMsg() {
    var code = 600;
    var msg = 'Response only contains one equip\'s data';
    return { code, msg };
}

async function queryShipData(query, httpcodeFlag, api) {
    try {
        if (api === 'info')
            var ships = await DbAccess.getShip(query);
        else if (api === 'cg')
            var ships = await DbAccess.getShipPartForCG(query);
    }
    catch (err) {
        // cannot get ship from db,respond 500
        console.error(err);
        httpcodeFlag = 500;
    }
    // if there is no object in `ships`, 
    // respond with 204 http status coode
    if (ships.length === 0)
        httpcodeFlag = 204;
    return { ships, httpcodeFlag };
}

async function queryEquipData(query, httpcodeFlag, req, matchfmt, api) {
    try {
        if (api === 'info')
            var equips = await DbAccess.getEquip(query);
        else if (api === 'cg')
            var equips = await DbAccess.getEquipPartForCG(query);
    }
    catch (err) {
        // cannot get equip from db,respond 500
        console.error(err);
        httpcodeFlag = 500;
    }
    // if there is no object in `equips`, 
    // respond with 204 http status coode
    if (equips.length === 0)
        httpcodeFlag = 204;
    // now we'll use levenshtein algorithm,
    // get the one which name is closest to match string
    try {
        var equip = await
            equipfunc.tellClosestMatch
                (equips, req.query.match, matchfmt);
    }
    catch (err) {
        // data access error,respond 500
        console.error(err);
        httpcodeFlag = 500;
    }
    return { equip, httpcodeFlag };
}

function getParams(req, httpcodeFlag, api) {
    var matchfmt = 'zh_cn';
    var resfmt = 'json';
    if (req.query.matchfmt)
        matchfmt = req.query.matchfmt;
    if (req.query.resfmt)
        resfmt = req.query.resfmt;

    // matchfmt&resfmt should only be one of specified string
    if (api === '/v1/ship/info' || api === '/v1/ship/cg') {
        var matchfmtList = ['ja_kana', 'ja_jp', 'ja_romaji', 'zh_cn'];
        var resfmtList = ['json', 'img'];
    } else if (api === '/v1/equip/info') {
        var matchfmtList = ['ja_jp', 'zh_cn'];
        var resfmtList = ['json', 'img'];
    } else if (api === '/v1/equip/cg') {
        var matchfmtList = ['ja_jp', 'zh_cn'];
        var resfmtList = ['json'];
    }
    if (!matchfmtList.includes(matchfmt)
        || !resfmtList.includes(resfmt)) {
        httpcodeFlag = 400;
    }
    return { matchfmt, resfmt, httpcodeFlag };
}

function getParamsImg(req) {
    var paramflag = false;
    var eid = 0;
    var cgid = 0;
    if (req.query.eid)
        eid = req.query.eid;
    else
        paramflag = true;
    if (req.query.cgid)
        cgid = req.query.cgid;
    else
        paramflag = true;
    return { paramflag, cgid, eid };
}

function resHead200Json(res, response) {
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    });
    res.end(JSON.stringify(response, null, "  "));
}

function resHead200Png(imgpath, res) {
    var img = fs.readFileSync(imgpath);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img, 'binary');
}

function makeJsonResponse(code, msg, ObjArray, res) {
    var response = {
        "code": code,
        "message": msg,
        "result": ObjArray
    };
    resHead200Json(res, response);
    return response;
}

// ==========================part functions END===========================

// ==========================start server START==========================

// 1. try to connect to mongodb
MongoClient.connect(config.mongodb, { useNewUrlParser: true },
    function (err, db) {
        if (err) {
            console.error('[kcrest start] Mongodb connect failed!'
                + '\nBut you can try to launch server first.');
            console.error(err);
        }
        else {
            console.info('[kcrest start] Mongodb connect success!');
            db.close();
        }
    })

// 2. start listening port
app.listen(config.port, config.serverip, function () {
    console.info('[kcrest start] Listening on port ' + config.port
        + '\n[kcrest start] Access it via http://%s:%d',
        config.serverip, config.port);
})

// ==========================start server END==========================

// ==========================router START===============================

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

// ==========================router END===============================

// ==========================req process funcs START=========================
function RootRoute(req, res) {
    printLog(req.ip, '/', 'GET', req.originalUrl, 200);

    // construct the response
    var response = {
        "project_url":
            "https://github.com/boholder/KanColleREST",
        "documentation_url":
            "https://github.com/boholder/KanColleREST/wiki",
        "ship_info_url": config.protocol + config.domain
            + "/v1/ship/info",
        "ship_cg_url": config.protocol + config.domain
            + "/v1/ship/cg",
        "equipment_info_url": config.protocol + config.domain
            + "/v1/equip/info",
        "equipment_cg_url": config.protocol + config.domain
            + "/v1/equip/cg"
    };

    resHead200Json(res, response);
}

async function ShipInfoRoute(req, res) {
    // flag for diciding which http code 
    // will be contained in response.
    var httpcodeFlag = 200;

    // if no 'match' param, response is a introduction
    if (!req.query.match) {
        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.info",
            "more_api": config.protocol + config.domain + "/"
        };
        resHead200Json(res, response);
    }
    // else we'll process this query
    else {
        // get parameters
        var matchfmt, resfmt;
        ({ matchfmt, resfmt, httpcodeFlag }
            = getParams(req, httpcodeFlag, '/v1/ship/info'));

        // construct db query structure for ship name query
        var query = shipfunc
            .shipQueryConstructor(matchfmt, req.query.match);

        // get query result from ship conllection
        var ships;
        ({ ships, httpcodeFlag } =
            await queryShipData(query, httpcodeFlag, 'info'));

        // if httpcodeFlag=200, go on; 
        // if not, reply http code directly.
        if (httpcodeFlag === 200) {
            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var { code, msg } = makeShipJsonResMsg(ships);

                // change main query's result, add more details into it.
                try {
                    await shipfunc.changeShipsResult(ships, 'info');
                }
                catch (err) {
                    console.error(err);
                }
                // construct the response
                makeJsonResponse(code, msg, ships, res);
            }
            // image format response
            else if (resfmt == 'img') {
                try {
                    var shipname = ships[0].name.zh_cn;
                    var imgpath = config.imgdirpath +
                        '/mian_pic/ship/ship_info/' + shipname + "1.png";
                    resHead200Png(imgpath, res);
                }
                catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                    httpcodeFlag = 204;
                }
            }
        }
        else {
            res.sendStatus(httpcodeFlag);
        }
    }

    // console.log()
    var reqParam = decodeURIComponent(req.originalUrl)
        .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1);
    printLog(req.ip, '/v1/ship/info', 'GET', reqParam, httpcodeFlag
    );
}

async function ShipCGRoute(req, res) {
    // flag for diciding which http code 
    // will be contained in response.
    var httpcodeFlag = 200;

    // if no 'match' param, response is a introduction
    if (!req.query.match) {
        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.cg",
            "more_api": config.protocol + config.domain + "/"
        };
        resHead200Json(res, response);
    }
    // else we'll process this query
    else {
        // get parameters
        var matchfmt, resfmt;
        ({ matchfmt, resfmt, httpcodeFlag }
            = getParams(req, httpcodeFlag, '/v1/ship/cg'));

        // construct db query structure for ship name query
        var query = shipfunc
            .shipQueryConstructor(matchfmt, req.query.match);

        // get query result from ship conllection
        var ships;
        ({ ships, httpcodeFlag } =
            await queryShipData(query, httpcodeFlag, 'cg'));

        if (httpcodeFlag === 200) {
            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var { code, msg } = makeShipJsonResMsg(ships);

                // change main query's result, add more details into it.
                try {
                    await shipfunc.changeShipsResult(ships, 'cg');
                }
                catch (err) {
                    console.error(err);
                }

                // construct the response
                makeJsonResponse(code, msg, ships, res);
            }
            // image format response
            if (resfmt == 'img') {
                try {
                    var shipname = ships[0].name.zh_cn;
                    var imgpath = config.imgdirpath
                        + '/mian_pic/ship/ship_cg/' + shipname + "2.png";
                    resHead200Png(imgpath, res);
                }
                catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                    httpcodeFlag = 204;
                }
            }
        }
        else {
            res.sendStatus(httpcodeFlag);
        }
    }

    // console.log()
    var reqParam = decodeURIComponent(req.originalUrl)
        .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1);
    printLog(req.ip, '/v1/ship/cg', 'GET', reqParam, httpcodeFlag
    );
}

function ImageShipRoute(req, res) {
    var { paramflag, cgid, eid } = getParamsImg(req);
    // flag for diciding which http code 
    // will be contained in response.
    var httpcodeFlag = 200;
    // if leak of paramater
    if (paramflag) {
        res.sendStatus(204);
        httpcodeFlag = 204;
    }
    else {
        try {
            var imgpath = getShipCGImgPath(cgid, eid);
            resHead200Png(imgpath, res);
        }
        catch (err) {
            console.error(err);
            res.sendStatus(204);
            httpcodeFlag = 204;
        }
    }
    // console.log()
    var reqParam = decodeURIComponent(req.originalUrl)
        .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1);
    printLog(req.ip, '/v1/image/ship', 'GET', reqParam, httpcodeFlag);
}

async function EquipInfoRoute(req, res) {
    var httpcodeFlag = 200;
    // if no 'match' param, response is a introduction
    if (!req.query.match) {
        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.equip.info",
            "more_api": config.protocol + config.domain + "/"
        };
        resHead200Json(res, response);
    }
    // else we'll process this query
    else {
        // get parameters
        var matchfmt, resfmt;
        ({ matchfmt, resfmt, httpcodeFlag }
            = getParams(req, httpcodeFlag, '/v1/equip/info'));

        // construct db query structure for equip name query
        var query =
            equipfunc.equipQueryConstructor
                (matchfmt, req.query.match, matchfmt);
        // get query result from equip conllection, 
        // it contains only one equip
        var equip;
        ({ equip, httpcodeFlag } =
            await queryEquipData
                (query, httpcodeFlag, req, matchfmt, 'info'));
        if (httpcodeFlag === 200) {

            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var { code, msg } = makeEquipJsonResMsg();

                // change main query's result, add more details into it.
                try {
                    await equipfunc.changeEquipResult(equip, 'info');
                }
                catch (err) {
                    console.error(err);
                    httpcodeFlag = 500;
                }

                // construct the response
                makeJsonResponse(code, msg, equip, res);
            }

            // image format response
            if (resfmt == 'img') {
                try {
                    var equipname = equip.name.zh_cn;
                    var imgpath = config.imgdirpath +
                        '/mian_pic/equip/' + equipname + ".jpg";
                    resHead200Png(imgpath, res);
                }
                catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                    httpcodeFlag = 204;
                }
            }
        }
        else {
            res.sendStatus(httpcodeFlag);
        }
    }
    // console.log()
    var reqParam = decodeURIComponent(req.originalUrl)
        .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1);
    printLog(req.ip, '/v1/equip/info', 'GET', reqParam, httpcodeFlag);
}

async function EquipCGRoute(req, res) {
    // flag for diciding which http code 
    // will be contained in response.
    var httpcodeFlag = 200;

    if (!req.query.match) {
        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.equip.cg",
            "more_api":
                config.protocol + config.domain + "/"
        };
        resHead200Json(res, response);
    }
    // else we'll process this query
    else {

        // get parameters
        var matchfmt, resfmt;
        ({ matchfmt, resfmt, httpcodeFlag }
            = getParams(req, httpcodeFlag, '/v1/equip/cg'));

        // construct db query structure for equip name query
        var query =
            equipfunc.equipQueryConstructor
                (matchfmt, req.query.match, matchfmt);

        // get query result from equip conllection, 
        // it contains only one equip
        var equip;
        ({ equip, httpcodeFlag } =
            await queryEquipData
                (query, httpcodeFlag, req, matchfmt, 'cg'));

        if (httpcodeFlag === 200) {
            if (resfmt === 'json') {
                // self designed response code & msg
                var { code, msg } = makeEquipJsonResMsg(equip);

                // change main query's result, add more details into it.
                try {
                    await equipfunc.changeEquipResult(equip, 'cg');
                }
                catch (err) {
                    console.error(err);
                    httpcodeFlag = 500;
                }
                // construct the response
                makeJsonResponse(code, msg, equip, res);
            }
        }
        else {
            res.sendStatus(httpcodeFlag);
        }
    }

    // console.log()
    var reqParam = decodeURIComponent(req.originalUrl)
        .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1);
    printLog(req.ip, '/v1/equip/cg', 'GET', reqParam, httpcodeFlag);
}

function ImageEquipRoute(req, res) {
    var { paramflag, cgid, eid } = getParamsImg(req);

    // flag for diciding which http code 
    // will be contained in response.
    var httpcodeFlag = 200;

    // if leak of paramater
    if (paramflag) {
        res.sendStatus(204);
    }
    else {
        try {
            // img files' name list
            var imgfilename = ['card', 'item_character',
                'item_on', 'item_up', 'statustop_item'];
            var imgpath = config.imgdirpath +
                '/WhoCallsTheFleet-Pics/dist/equipments/'
                + eid + '/' + imgfilename[cgid] + '.png';
            resHead200Png(imgpath, res);
        }
        catch (err) {
            console.error(err);
            res.sendStatus(204);
        }
    }
}

// ==========================req process funcs END==========================