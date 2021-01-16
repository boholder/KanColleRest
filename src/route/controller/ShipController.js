"use strict";

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
            "more_api": config.protocol + config.serverDomain + "/"
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
                    var imgpath = config.imagePath +
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
            "more_api": config.protocol + config.serverDomain + "/"
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
                    var imgpath = config.imagePath
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