"use strict";

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

function getShipCGImgPath(cgid, eid) {
    if (cgid < 10) {
        // normal cg
        var imgpath = config.imagePath +
            '/WhoCallsTheFleet-Pics/dist/ships/'
            + eid + '/' + cgid + '.png';
    } else {
        //extra cg
        var exid = String(cgid).substr(2),
            prefix = String(cgid).charAt(1);

        if (prefix === '0') {
            // no_contour
            var imgpath = config.imagePath +
                '/WhoCallsTheFleet-Pics/dist/ships-extra/'
                + exid + '/' + '8.png';
        } else if (prefix === '1') {
            // no_contour_dmged
            var imgpath = config.imagePath +
                '/WhoCallsTheFleet-Pics/dist/ships-extra/'
                + exid + '/' + '9.png';
        }
    }
    return imgpath;
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