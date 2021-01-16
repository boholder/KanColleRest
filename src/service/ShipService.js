"use strict";

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