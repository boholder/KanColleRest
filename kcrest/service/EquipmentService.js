"use strict";

function makeEquipJsonResMsg() {
    var code = 600;
    var msg = 'Response only contains one equip\'s data';
    return { code, msg };
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