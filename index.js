/*
 * This js handles requests and deal with them, it's the first one .
*/
// =====import START=====

// get config consts
const config = require('./FunctionModule/config')

// outer module
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

// express module api.
// for not reply 304(http signal code, "Not Modified") automatically,
// so I can send 204 or so
app.disable('etag');

// ship functions
var shipfunc = require('./FunctionModule/ShipDataCtrl');
// DAO functions
var DbAccess = require('./FunctionModule/DbAccess');
// equipment functions
var equipfunc = require('./FunctionModule/EquipDataCtrl');

// =====import END=====

// ======start server START=====
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

// ======start server END=========

// print out query log on console
// {"time": "2019-5-31 11:01:27", "srcip": "127.0.0.1", 
// "api": "/v1/ship/cg", "method": "GET", "url": "match=����"}

function printLog(srcip, api, method, url) {
    var time = new Date();
    console.log('{"time": "' + time.toLocaleString()
        + '", "srcip": "' + srcip +
        '", "api": "' + api
        + '", "method": "' + method
        + '", "url": "' + url + '"}');
}

// ============router===============

app.get('/', (req, res) => {
    // console log
    printLog(req.ip, '/', 'GET', req.originalUrl);

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

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, "  "));
})

//by "async" I can finally synchronously get db data in array & send it back.
// line 89-128, repeat in almost every function
app.get('/v1/ship/info', (async (req, res) => {
    // console log
    printLog(req.ip, '/v1/ship/info', 'GET',
        decodeURIComponent(req.originalUrl)
            .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1));

    // if no 'match' param, response is a introduction
    if (!req.query.match) {

        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.info",
            "more_api": config.protocol + config.domain + "/"
        };

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(response, null, "  "));
    }
    // else we'll process this query
    else {
        //before construct response
        {
            // flag for diciding which http code 
            // will be contained in response.
            var httpcodeFlag = 200;

            // get parameters
            var matchfmt = 'zh_cn';
            var resfmt = 'json';
            if (req.query.matchfmt) matchfmt = req.query.matchfmt;
            if (req.query.resfmt) resfmt = req.query.resfmt;

            // matchfmt&resfmt should only be one of specified string
            var matchfmtList = ['ja_kana', 'ja_jp', 'ja_romaji', 'zh_cn'];
            var resfmtList = ['json', 'img'];
            if (!matchfmtList.includes(matchfmt)
                || !resfmtList.includes(resfmt)) {
                httpcodeFlag = 400;
            }

            // construct db query structure for ship name query
            var query = shipfunc
                .shipinfoMainQueryConstructor(matchfmt, req.query.match);

            // get query result from ship conllection
            try {
                var ships = await DbAccess.getShip(query);
            } catch (err) {
                // cannot get ship from db,respond 500
                console.error(err);
                httpcodeFlag = 500;
            }

            // if there is no object in `ships`, 
            // respond with 204 http status coode
            if (ships.length === 0)
                httpcodeFlag = 204;
        }

        // if httpcodeFlag=200, go on; if not, reply http code.
        if (httpcodeFlag === 200) {
            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var code = 600;
                var msg = 'Response only contains one ship\'s data';

                // flag to mark if `ships` 
                // contains more than one ship's data or not
                var flag = false;

                // if not, determine `ships` contains 
                // more than one ship's data or not
                try {
                    var name1 = ships[0].name.zh_cn;
                } catch (err) {
                    console.error(err);
                }

                if (name1 !== ships[ships.length - 1].name.zh_cn)
                    flag = true;

                if (flag) {
                    code = 601;
                    msg = 'You sent a fuzzy request '
                        + 'so response contains more than one ship\'s data';
                }

                // change main query's result, add more details into it.
                try {
                    await shipfunc.shipinfoSubQuery(ships, 'info');
                } catch (err) {
                    console.error(err);
                }

                // construct the response
                var response = {
                    "code": code,
                    "message": msg,
                    "result": ships
                };

                res.writeHead(200, {
                    'Content-Type':
                        'application/json;charset=utf-8'
                });
                res.end(JSON.stringify(response, null, '  '));
            }
            // image format response
            else if (resfmt == 'img') {
                try {
                    var shipname = ships[0].name.zh_cn;
                    var imgpath = config.imgdirpath +
                        '/mian_pic/ship/ship_info/' + shipname + "1.png";

                    var img = fs.readFileSync(imgpath);

                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                } catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                }

            }
        } else {
            res.sendStatus(httpcodeFlag);
        }
    }
}));

app.get('/v1/ship/cg', (async (req, res) => {
    // console log
    //{"time": "2019-5-31 11:01:27", "srcip": "127.0.0.1", 
    //"api": "/v1/ship/cg", "method": "GET", "url": "match=����"}
    printLog(req.ip, '/v1/ship/cg', 'GET',
        decodeURIComponent(req.originalUrl).
            substr(decodeURIComponent(req.originalUrl).indexOf("?") + 1));

    var match;
    // if no 'match' param, response is a introduction
    if (!req.query.match) {

        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.ship.cg",
            "more_api": config.protocol + config.domain + "/"
        };

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(response, null, "  "));
    }
    // else we'll process this query
    else {
        //before construct response
        {
            // flag for diciding which http code will be contained in response.
            var httpcodeFlag = 200;

            // get parameters
            match = req.query.match;
            var matchfmt = 'zh_cn';
            var resfmt = 'json';
            if (req.query.matchfmt) matchfmt = req.query.matchfmt;
            if (req.query.resfmt) resfmt = req.query.resfmt;

            // matchfmt&resfmt should only be one of specified string
            var matchfmtList = ['ja_kana', 'ja_jp', 'ja_romaji', 'zh_cn'];
            var resfmtList = ['json', 'img'];
            if (!matchfmtList.includes(matchfmt)
                || !resfmtList.includes(resfmt)) {
                httpcodeFlag = 400;;
            }

            // construct db query structure for ship name query
            var query = shipfunc
                .shipinfoMainQueryConstructor(matchfmt, req.query.match);

            // get query result from ship conllection
            try {
                var ships = await DbAccess.getShipPartForCG(query);
            } catch (err) {
                // cannot get ship from db,respond 204
                console.error(err);
                httpcodeFlag = 204;
            }

            // if there is no object in `ships`, 
            // respond with 204 http status coode
            if (ships.length === 0)
                httpcodeFlag = 204;
        }

        if (httpcodeFlag === 200) {
            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var code = 600;
                var msg = 'Response only contains one ship\'s data.';

                //flag to mark if `ships` contains 
                // more than one ship's data or not
                var flag = false;

                // determine `ships` contains 
                // more than one ship's data or not
                try {
                    var name1 = ships[0].name.zh_cn;
                } catch (err) {
                    console.error(err);
                }

                if (name1 !== ships[ships.length - 1].name.zh_cn)
                    flag = true;

                if (flag) {
                    code = 601;
                    msg = 'You sent a fuzzy request '
                        + 'so response contains more than one ship\'s data.';
                }

                // change main query's result, add more details into it.
                try {
                    await shipfunc.shipinfoSubQuery(ships, 'cg');
                } catch (err) {
                    console.error(err);
                }

                // construct the response
                var response = {
                    "code": code,
                    "message": msg,
                    "result": ships
                };

                res.writeHead(200, {
                    'Content-Type':
                        'application/json;charset=utf-8'
                });
                res.end(JSON.stringify(response, null, '  '));
            }

            // image format response
            if (resfmt == 'img') {

                try {
                    var shipname = ships[0].name.zh_cn;
                    var imgpath = config.imgdirpath
                        + '/mian_pic/ship/ship_cg/' + shipname + "2.png";

                    var img = fs.readFileSync(imgpath);

                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                } catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                }

            }
        } else {
            res.sendStatus(httpcodeFlag);
        }
    }

}))

// not public, for v1/ship/cg, 
// result's image URI can be access via here and get image file.
app.get('/v1/image/ship', (async (req, res) => {
    // get paramaters
    var paramflag = false;
    var shipid = 0;
    var cgid = 0;
    if (req.query.shipid)
        shipid = req.query.shipid;
    else
        paramflag = true;

    if (req.query.cgid)
        cgid = req.query.cgid;
    else
        paramflag = true;

    // if leak of paramater
    if (paramflag) {
        res.sendStatus(204);
    } else {
        try {
            if (cgid < 10) {
                // normal cg
                var imgpath = config.imgdirpath +
                    '/WhoCallsTheFleet-Pics/dist/ships/'
                    + shipid + '/' + cgid + '.png';
            } else {
                //extra cg
                var exid = String(cgid).substr(2),
                    prefix = String(cgid).substr(0, 1);

                if (prefix === '0') {
                    // no_contour
                    var imgpath = config.imgdirpath +
                        '/WhoCallsTheFleet-Pics/dist/ships-extra/'
                        + exid + '/' + '8.png';
                } else if (prefix === '1') {
                    // no_contour_dmged
                    var imgpath = config.imgdirpath +
                        '/WhoCallsTheFleet-Pics/dist/ships-extra/'
                        + exid + '/' + '9.png';
                }
            }
            var img = fs.readFileSync(imgpath);

            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img, 'binary');
        } catch (err) {
            console.error(err);
            res.sendStatus(204);
        }
    }
}))

app.get('/v1/equip/info', (async (req, res) => {
    // console log
    printLog(req.ip, '/v1/equip/info', 'GET',
        decodeURIComponent(req.originalUrl)
            .substr(decodeURIComponent(req.originalUrl).indexOf('?') + 1));

    // if no 'match' param, response is a introduction
    if (!req.query.match) {

        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.equip.info",
            "more_api": config.protocol + config.domain + "/"
        };

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(response, null, "  "));
    }
    // else we'll process this query
    else {
        //before construct response
        {
            // flag for diciding which http code 
            // will be contained in response.
            var httpcodeFlag = 200;

            // get parameters
            var matchfmt = 'zh_cn';
            var resfmt = 'json';
            if (req.query.matchfmt) matchfmt = req.query.matchfmt;
            if (req.query.resfmt) resfmt = req.query.resfmt;

            // matchfmt&resfmt should only be one of specified string
            var matchfmtList = ['ja_jp', 'zh_cn'];
            var resfmtList = ['json', 'img'];
            if (!matchfmtList.includes(matchfmt)
                || !resfmtList.includes(resfmt)) {
                httpcodeFlag = 400;
            }

            // construct db query structure for equip name query
            var query = equipfunc.equipQueryConstructor
                (matchfmt, req.query.match, matchfmt);

            // get query result from equip conllection, 
            // it contains more than one equip
            try {
                var equips = await DbAccess.getEquip(query);
            } catch (err) {
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
                var equip = await equipfunc.tellClosestMatch
                    (equips, req.query.match, matchfmt)
            } catch (err) {
                // data access error,respond 500
                console.error(err);
                httpcodeFlag = 500;
            }
        }

        if (httpcodeFlag === 200) {
            // json format response
            if (resfmt == 'json') {
                // self designed response code & msg
                var code = 600;
                var msg = 'Response only contains one equip\'s data';

                // change main query's result, add more details into it.
                try {
                    await equipfunc.changeEquipResult(equip, 'info');
                } catch (err) {
                    console.error(err);
                }

                // construct the response
                var response = {
                    "code": code,
                    "message": msg,
                    "result": equip
                };

                res.writeHead(200, {
                    'Content-Type':
                        'application/json;charset=utf-8'
                });
                res.end(JSON.stringify(response, null, '  '));
            }
            // image format response
            if (resfmt == 'img') {
                try {
                    var equipname = equip.name.zh_cn;
                    var imgpath = config.imgdirpath +
                        '/mian_pic/equip/' + equipname + ".jpg";

                    var img = fs.readFileSync(imgpath);

                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(img, 'binary');
                } catch (err) {
                    console.error(err);
                    res.sendStatus(204);
                }
            }
        } else {
            res.sendStatus(httpcodeFlag);
        }
    }
}))

app.get('/v1/equip/cg', (async (req, res) => {
    // console log
    //{"time": "2019-5-31 11:01:27", "srcip": "127.0.0.1", 
    //"api": "/v1/ship/cg", "method": "GET", "url": "match=����"}
    printLog(req.ip, '/v1/equip/cg', 'GET',
        decodeURIComponent(req.originalUrl).
            substr(decodeURIComponent(req.originalUrl).indexOf("?") + 1));

    var match;
    // if no 'match' param, response is a introduction
    if (!req.query.match) {

        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.equip.cg",
            "more_api": config.protocol + config.domain + "/"
        };

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(response, null, "  "));
    }
    // else we'll process this query
    else {
        //before construct response
        {
            // flag for diciding which http code 
            // will be contained in response.
            var httpcodeFlag = 200;

            // get parameters
            match = req.query.match;
            var matchfmt = 'zh_cn';
            if (req.query.matchfmt) matchfmt = req.query.matchfmt;

            // resfmt: only json format, 
            // but we can remain these code for tomorrow
            var resfmt = 'json';
            //if (req.query.resfmt) resfmt = req.query.resfmt;


            // matchfmt&resfmt should only be one of specified string
            var matchfmtList = ['ja_jp', 'zh_cn'];
            var resfmtList = ['json'];
            if (!matchfmtList.includes(matchfmt)
                || !resfmtList.includes(resfmt)) {
                httpcodeFlag = 400;;
            }

            // construct db query structure for equip name query
            var query = equipfunc.equipQueryConstructor
                (matchfmt, req.query.match, matchfmt);

            // get query result from equip conllection, 
            // it contains more than one equip
            try {
                var equips = await DbAccess.getEquipPartForCG(query);
            } catch (err) {
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
                var equip = await equipfunc.tellClosestMatch
                    (equips, req.query.match, matchfmt)
            } catch (err) {
                // data access error,respond 500
                console.error(err);
                httpcodeFlag = 500;
            }
        }

        if (httpcodeFlag === 200) {
            if (resfmt === 'json') {
                // self designed response code & msg
                var code = 600;
                var msg = 'Response only contains one equip\'s data.';

                // change main query's result, add more details into it.
                try {
                    await equipfunc.changeEquipResult(equip, 'cg');
                } catch (err) {
                    console.error(err);
                }

                // construct the response
                var response = {
                    "code": code,
                    "message": msg,
                    "result": equip
                };

                res.writeHead(200, {
                    'Content-Type':
                        'application/json;charset=utf-8'
                });
                res.end(JSON.stringify(response, null, '  '));
            }
        } else {
            res.sendStatus(httpcodeFlag);
        }
    }
}))

// not public, for v1/equip/cg, 
// result's image URI can be access via here and get image file.
app.get('/v1/image/equip', (async (req, res) => {
    // get paramaters
    // if paramflag->true, not a valid request
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

    // if leak of paramater
    if (paramflag) {
        res.sendStatus(204);
    } else {
        try {
            // img files' name list
            var imgfilename = ['card', 'item_character',
                'item_on', 'item_up', 'statustop_item'];

            var imgpath = config.imgdirpath +
                '/WhoCallsTheFleet-Pics/dist/equipments/'
                + eid + '/' + imgfilename[cgid] + '.png';

            var img = fs.readFileSync(imgpath);

            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img, 'binary');
        } catch (err) {
            console.error(err);
            res.sendStatus(204);
        }
    }
}))