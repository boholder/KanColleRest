// read server config
var fs = require('fs');
var configfile = './serverconfig.json';
var config = JSON.parse(fs.readFileSync(configfile));


const express = require('express');
const app = express();
// for not send 304 automatically, so I can send 204 or so
app.disable('etag');
var MongoClient = require('mongodb').MongoClient;


// =====import functions=====
// other functions
var func = require('./FunctionModule/index_functions');
// DAO functions
var dao = require('./FunctionModule/dao');

// =======Consts, you'd modify them in serverconfig.json if you need.====

// Mongodb url
const mongodb = config.mongodb;
// kancolle database name (or other name, whatever)
const kcdb = config.kcdb;
// which port to listen, default is 3000.
const port = config.port;
// server ip,maybe this device have more than one ip?
// for develop I set it to 127.0.0.1,
// but you MUST change it to your server's public IP for web service.
const serverip = config.ip;
// domain
const domain = config.domain;

// =======const end=======

// ======start server=====
// 1. try to connect to mongodb
MongoClient.connect(mongodb, { useNewUrlParser: true }, function (err, db) {
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
app.listen(port, serverip, function () {
    console.info('[kcrest start] Listening on port ' + port
        + '\n[kcrest start] Access it via http://%s:%d', serverip, port);
})

// ======start server end=========

// ============router===============


app.get('/', (req, res) => {
    // console log
    func.printLog(req.ip, '/', 'GET', req.originalUrl);

    // construct the response
    var response = {
        "project_url": "https://github.com/boholder/KanColleREST",
        "documentation_url": "https://github.com/boholder/KanColleREST/wiki",
        "ship_info_url": "http://" + domain + "/v1/ship/info"
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, "  "));
})

//by this way I can finally synchronously get db data in array & send it back.
app.get('/v1/ship/info', (async (req, res) => {
    // console log
    func.printLog(req.ip, '/v1/ship/info', 'GET', req.originalUrl);

    var match;
    // if no 'match' param, response is a introduction
    if (!req.query.match) {

        // construct the response
        var response = {
            "message": "Missing required parameters",
            "documentation_url": "https://github.com/boholder/KanColleREST/wiki/ship.info"
        };

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(response, null, "  "));
    }
    // else we'll process this query
    else {
        // get parameters
        match = req.query.match;
        var matchfmt = 'zh_cn';
        var resfmt = 'json';
        if (req.query.matchfmt) matchfmt = req.query.matchfmt;
        if (req.query.resfmt) resfmt = req.query.resfmt;

        // construct db query structure for ship name query
        var query = func.shipinfoMainQueryConstructor(matchfmt, req.query.match);

        // get query result from ship conllection
        try {
            var ships = await dao.getShip(query);
        } catch (err) {
            // cannot get ship from db,respond 204
            console.error(err);
            res.sendStatus(204);
        }

        // if there is no object in `ships`, respond with 204 http status coode
        if (ships.length === 0)
            res.sendStatus(204);

        // json format response
        if (resfmt == 'json') {
            // self designed response code & msg
            var code = 600;
            var msg = 'Response only contains one ship\'s data';

            //flag to mark if `ships` contains more than one ship's data or not
            var flag = false;

            // if there is no object in `ships`, respond with 204 http status coode

            // if not, determine `ships` contains more than one ship's data or not
            try {
                var name1 = ships[0].name.zh_cn;
            } catch (err) {
                console.error(err);
            }
            for (var i = 1; i < ships.length; i++) {
                if (name1 !== ships[i].name.zh_cn)
                    flag = true;
            }

            if (flag) {
                code = 601;
                msg = 'You sent a fuzzy request '
                    + 'so response contains more than one ship\'s data';
            }

            // change main query's result, add more details into it.
            try {
                await func.shipinfoSubQuery(ships);
            } catch (err) {
                console.error(err);
            }

            // construct the response
            var response = {
                "code": code,
                "message": msg,
                "result": ships
            };

            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(JSON.stringify(response, null, '  '));
        }
        // image format response
        if (resfmt == 'img') {


            try {
                var shipname = ships[0].name.zh_cn;
                var imgpath = './mian_pic/ship/ship_info/' + shipname + "1.png";

                var img = fs.readFileSync(imgpath);
            } catch (err) {
                console.error(err);
                res.sendStatus(204);
            }

            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img, 'binary');
        }
    }
}));