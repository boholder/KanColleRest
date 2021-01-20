"use strict";

async function EquipInfoRoute(req, res) {
    var httpcodeFlag = 200;
    // if no 'match' param, response is a introduction
    if (!req.query.match) {
        // construct the response
        var response = {
            "documentation_url":
                "https://github.com/boholder/KanColleREST/wiki/v1.equip.info",
            "more_api": config.protocol + config.serverDomain + "/"
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
                    var imgpath = config.imagePath +
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
                config.protocol + config.serverDomain + "/"
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
        httpcodeFlag = 204;
    }
    else {
        try {
            // img files' name list
            var imgfilename = ['card', 'item_character',
                'item_on', 'item_up', 'statustop_item'];
            var imgpath = config.imagePath +
                '/WhoCallsTheFleet-Pics/dist/equipments/'
                + eid + '/' + imgfilename[cgid] + '.png';
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
    printLog(req.ip, '/v1/image/equip', 'GET', reqParam, httpcodeFlag);
}