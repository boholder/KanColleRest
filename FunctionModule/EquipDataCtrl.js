/*
 * This js is called by index.js, and calls DbAccess.js
 * These functions change result 
 * that equip/info,equip/cg api response contains.
 */

// JS implementation calculating the Levenshtein distance,
// i.e.the difference between two strings.
// https://www.npmjs.com/package/js-levenshtein
const levenshtein = require('js-levenshtein');

// get config consts
const config = require('./config')

// DAO functions
var DbAccess = require('./DbAccess');

// equip/info db query json constructor
// return example: {"name.??": ?? }
function equipQueryConstructor(matchfmt, match) {
    // regex query, name contains this match str
    // fuzzy search
    match = '.*' + match + '.*';

    if (matchfmt == 'zh_cn') {
        var query = {
            "name.zh_cn": { $regex: match }
        };
        return query;
    }
    if (matchfmt == 'ja_jp') {
        var query = {
            "name.ja_jp": { $regex: match }
        };
        return query;
    }
}
exports.equipQueryConstructor = equipQueryConstructor;

async function changeEquipResult(equipObj, qtype) {
    if (qtype === 'info') {
        try {
            await changeOneEquipObj(equipObj);
        } catch (err) {
            console.error(err);
        }
    }

    if (qtype === 'cg') {
        try {
            await changeOneEquipObjCG(equipObj);
        } catch (err) {
            console.error(err);
        }
    }
}
exports.changeEquipResult = changeEquipResult;

async function tellClosestMatch(equips, match, matchfmt) {
    var distanceList = new Array();
    if (matchfmt === 'zh_cn') {
        for (var i = 0; i < equips.length; i++) {
            distanceList.push(
                levenshtein(match, equips[i].name.zh_cn))
        }
    }
    if (matchfmt === 'ja_jp') {
        for (var i = 0; i < equips.length; i++) {
            distanceList.push(
                levenshtein(match, equips[i].name.ja_jp))
        }
    }

    // reutrn the element in array 
    // which name have minist distance with match str
    // equip array[index of minist element in dist array
    //              (also index in equip array)]
    return equips[
        distanceList.indexOf(
            Math.min.apply(Math, distanceList))];
}
exports.tellClosestMatch = tellClosestMatch;

async function changeOneEquipObj(equip) {

    // type
    try {
        var type = await DbAccess.getEquipType({ id: equip.type });

        var ja_jp = null, en_us = null, zh_cn = null;
        if (type.name.ja_jp)
            ja_jp = type.name.ja_jp;
        if (type.name.en_us)
            en_us = type.name.en_us;
        if (type.name.zh_cn)
            zh_cn = type.name.zh_cn;

        equip.type = { ja_jp, en_us, zh_cn };
    } catch (err) {
        console.error(err);
    }

    // default_equipped_on (ships' name)
    // equip.default_equipped_on is an array,it contains ships' id
    try {
        if (equip.default_equipped_on) {

            // construct four name array
            var ja_jp = new Array();
            var zh_cn = new Array();
            var ja_romaji = new Array();
            var ja_kana = new Array();

            // get each ship's name and push them in different array
            for (var i = 0; i < equip.default_equipped_on.length; i++) {
                var queryship = await DbAccess.getShipName
                    ({ id: equip.default_equipped_on[i] });

                if (queryship.name.suffix) {
                    var suffix = await DbAccess.getSuffix
                        ({ id: queryship.name.suffix });

                    if (queryship.name.ja_jp && suffix.ja_jp)
                        ja_jp.push(queryship.name.ja_jp + suffix.ja_jp);
                    if (queryship.name.ja_romaji && suffix.ja_romaji)
                        ja_romaji.push(queryship.name.ja_romaji
                            + suffix.ja_romaji);
                    if (queryship.name.ja_kana && suffix.ja_romaji)
                        ja_kana.push(queryship.name.ja_kana
                            + suffix.ja_romaji);
                    if (queryship.name.zh_cn && suffix.zh_cn)
                        zh_cn.push(queryship.name.zh_cn + suffix.zh_cn);

                } else {

                    if (queryship.name.ja_jp)
                        ja_jp.push(queryship.name.ja_jp);
                    if (queryship.name.ja_romaji)
                        ja_romaji.push(queryship.name.ja_romaji);
                    if (queryship.name.ja_kana)
                        ja_kana.push(queryship.name.ja_kana);
                    if (queryship.name.zh_cn)
                        zh_cn.push(queryship.name.zh_cn);
                }
            }

            equip.default_equipped_on = { ja_jp, ja_kana, ja_romaji, zh_cn };
        }
    } catch (err) {
        console.error(err)
    }

    // upgrade_from
    // an array,contains equip id
    try {
        if (equip.upgrade_from) {
            // construct name array
            var ja_jp = new Array();
            var zh_cn = new Array();

            // get each equip's name and push them in different array
            for (var i = 0; i < equip.upgrade_from.length; i++) {
                var queryequip = await DbAccess.getEquipName
                    ({ id: equip.upgrade_from[i] });

                if (queryequip.name.ja_jp)
                    ja_jp.push(queryequip.name.ja_jp);
                if (queryequip.name.zh_cn)
                    zh_cn.push(queryequip.name.zh_cn);
            }

            equip.upgrade_from = { ja_jp, zh_cn };
        }
    } catch (err) {
        console.error(err);
    }

    // upgrade_for
    // an array,contains equip id
    try {
        if (equip.upgrade_for) {
            // construct name array
            var ja_jp = new Array();
            var zh_cn = new Array();

            // get each equip's name and push them in different array
            for (var i = 0; i < equip.upgrade_for.length; i++) {
                var queryequip = await DbAccess.getEquipName
                    ({ id: equip.upgrade_for[i] });

                if (queryequip.name.ja_jp)
                    ja_jp.push(queryequip.name.ja_jp);
                if (queryequip.name.zh_cn)
                    zh_cn.push(queryequip.name.zh_cn);
            }

            equip.upgrade_for = { ja_jp, zh_cn };
        }
    } catch (err) {
        console.error(err);
    }

    // upgrade_to
    // an array,contains array object like [id,improvement level]
    try {
        if (equip.upgrade_to) {
            // construct name array
            var ja_jp = new Array();
            var zh_cn = new Array();

            // get each equip's name and push them in different array
            for (var i = 0; i < equip.upgrade_to.length; i++) {
                var queryequip = await DbAccess.getEquipName
                    ({ id: equip.upgrade_to[i][0] });

                // if level != 0, add improvement level
                if (equip.upgrade_to[i][1] === 0) {
                    if (queryequip.name.ja_jp)
                        ja_jp.push(queryequip.name.ja_jp);
                    if (queryequip.name.zh_cn)
                        zh_cn.push(queryequip.name.zh_cn);
                } else {
                    if (queryequip.name.ja_jp)
                        ja_jp.push(queryequip.name.ja_jp + '+'
                            + equip.upgrade_to[i][1]);
                    if (queryequip.name.zh_cn)
                        zh_cn.push(queryequip.name.zh_cn + '+'
                            + equip.upgrade_to[i][1]);
                }
            }

            equip.upgrade_to = { ja_jp, zh_cn };
        }
    } catch (err) {
        console.error(err);
    }

    // and let's get upgrade_from|for|to to be one key: upgrade
    var upfrom = equip.upgrade_from,
        upto = equip.upgrade_to,
        upfor = equip.upgrade_for;

    equip.upgrade = {
        upfrom, upto, upfor
    };

    delete equip.upgrade_from;
    delete equip.upgrade_to;
    delete equip.upgrade_for;

    // equip.improvement is a complex array
    if (equip.improvement) {
        try {
            // improvement element iter
            for (var k = 0; k < equip.improvement.length; k++) {
                // improvement.req:
                //   [[[date array,boolean type], [ships' name array]], ...]   
                //        secretary ships' name & 
                //        improveable date(in one week, 0 for sunday)

                //  after think through, I dicided not to change date array,
                //  it's easier for programing despite not so readable.
                //  but I can change array type to key-value type,
                for (var j = 0; j < equip.improvement[k].req.length; j++) {

                    // construct four name array
                    var ja_jp = new Array();
                    var zh_cn = new Array();
                    var ja_romaji = new Array();
                    var ja_kana = new Array();

                    // get each ship's name and push them in different array
                    for (var i = 0; i < equip.improvement[k].req[j][1].length;
                        i++) {
                        var queryship = await DbAccess.getShipName
                            ({ id: equip.improvement[k].req[j][1][i] });

                        if (queryship.name.suffix) {
                            var suffix = await DbAccess.getSuffix
                                ({ id: queryship.name.suffix });

                            if (queryship.name.ja_jp && suffix.ja_jp)
                                ja_jp.push(queryship.name.ja_jp
                                    + suffix.ja_jp);
                            if (queryship.name.ja_romaji && suffix.ja_romaji)
                                ja_romaji.push(queryship.name.ja_romaji
                                    + suffix.ja_romaji);
                            if (queryship.name.ja_kana && suffix.ja_romaji)
                                ja_kana.push(queryship.name.ja_kana
                                    + suffix.ja_romaji);
                            if (queryship.name.zh_cn && suffix.zh_cn)
                                zh_cn.push(queryship.name.zh_cn
                                    + suffix.zh_cn);

                        } else {

                            if (queryship.name.ja_jp)
                                ja_jp.push(queryship.name.ja_jp);
                            if (queryship.name.ja_romaji)
                                ja_romaji.push(queryship.name.ja_romaji);
                            if (queryship.name.ja_kana)
                                ja_kana.push(queryship.name.ja_kana);
                            if (queryship.name.zh_cn)
                                zh_cn.push(queryship.name.zh_cn);
                        }
                    }

                    // if there is only one ship can do this
                    var ship;
                    if (ja_jp.length === 1) {
                        ja_jp = ja_jp[0], ja_kana = ja_kana[0],
                            ja_romaji = ja_romaji[0], zh_cn = zh_cn[0];
                        ship = { ja_jp, ja_kana, ja_romaji, zh_cn };
                    } else {
                        ship = { ja_jp, ja_kana, ja_romaji, zh_cn };
                    }
                    var weekprog = equip.improvement[k].req[j][0];

                    //// add a readable weekly calendar
                    //var weekhuman = new Array();

                    //// different language
                    //var weeken_us = [Sun, Mon, Tue, Wed, Thu, Fri, Sat];

                    //var for (var l = 0; l < 7; i++) {
                    //    if (weekprog[l] === true)
                    //        weekhuman.push
                    //}

                    // change array to key-value
                    equip.improvement[k].req[j] = { ship, weekprog };
                }

                // improvement.upgrade: one of equip.upgrade_to elements
                //   [equip id, improvement level]
                {
                    var zh_cn, ja_jp;

                    var queryupequip = await DbAccess.getEquipName
                        ({ id: equip.improvement[k].upgrade[0] });

                    if (equip.improvement[k].upgrade[1] === 0) {
                        zh_cn = queryupequip.name.zh_cn;
                        ja_jp = queryupequip.name.ja_jp;
                    } else {
                        ja_jp = queryupequip.name.ja_jp
                            + queryupequip.suffix.ja_jp;
                        zh_cn = queryupequip.name.zh_cn
                            + queryupequip.suffix.zh_cn;
                    }

                    equip.improvement[k].upgrade = { ja_jp, zh_cn };
                }

                // improvement.resource, too complex to explain
                {
                    // resource[0],[fuel,ammo,steel,bauxite]
                    var fuel = equip.improvement[k].resource[0][0],
                        ammo = equip.improvement[k].resource[0][1],
                        steel = equip.improvement[k].resource[0][2],
                        bauxite = equip.improvement[k].resource[0][3];
                    var basic = { fuel, ammo, steel, bauxite };

                    // resource[1|2|3], [number || array]
                    // [1],[number || array] ?+0 ~ +6
                    // [2],[number || array] ?+6 ~ +max
                    // [3],[number || array] upgrade
                    var request = new Array();
                    for (var j = 1; j < 4; j++) {
                        // development materials
                        var devmalts = equip.improvement[k]
                            .resource[j][0];
                        var devmalts_sure = equip.improvement[k]
                            .resource[j][1];
                        // improvement materials
                        var imprvmalts = equip.improvement[k]
                            .resource[j][2];
                        var imprvmalts_sure = equip.improvement[k]
                            .resource[j][3];

                        // consumables
                        if (typeof equip.improvement[k]
                            .resource[j][4] === 'number') {
                            var queryequip = await DbAccess.getEquipName
                                ({ id: equip.improvement[k].resource[j][4] });
                            var ja_jp = queryequip.name.ja_jp,
                                zh_cn = queryequip.name.zh_cn;
                            var name = { ja_jp, zh_cn };
                            var num = 1;
                            var consumables = [{ name, num }];
                        } else if (typeof equip.improvement[k]
                            .resource[j][4] === 'object') {
                            // consume more than one item
                            var consumables = new Array();
                            for (var i = 0; i < equip.improvement[k]
                                .resource[j][4].length; i++) {

                                var cid = equip.improvement[k]
                                    .resource[j][4][i][0];
                                var num = equip.improvement[k]
                                    .resource[j][4][i][1];
                                var name = '';

                                if (!cid || num === 0) {
                                    break;
                                } else if (typeof cid === 'number') {
                                    var queryequip = await DbAccess.
                                        getEquipName({ id: cid });
                                    var ja_jp = queryequip.name.ja_jp,
                                        zh_cn = queryequip.name.zh_cn;
                                    name = { ja_jp, zh_cn };
                                    consumables.push({ name, num });
                                } else if (typeof cid === 'string') {
                                    // 'consumable_' + 'id'
                                    ccid = Number(cid.substr
                                        (cid.indexOf('_') + 1));
                                    var queryconsum = await DbAccess.
                                        getConsumableName({ id: ccid });
                                    var ja_jp = queryconsum.name.ja_jp,
                                        zh_cn = queryconsum.name.zh_cn;
                                    name = { ja_jp, zh_cn };
                                    consumables.push({ name, num });
                                }
                            }
                        }

                        request.push({
                            devmalts, devmalts_sure, imprvmalts,
                            imprvmalts_sure, consumables
                        });
                    }
                    // for resource[1|2|3] END

                    // make result readable
                    var zero2six = request[0],
                        six2max = request[1],
                        upgrade = request[2];
                    equip.improvement[k].resource = {
                        basic, zero2six,
                        six2max, upgrade
                    };
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    // dismantle, readable
    var fuel = equip.dismantle[0],
        ammo = equip.dismantle[1],
        steel = equip.dismantle[2],
        bauxite = equip.dismantle[3];
    equip.dismantle = { fuel, ammo, steel, bauxite };

    // delete no use fields
    delete equip.time_created;
    delete equip.time_modified;
    delete equip.illust_version;
    delete equip._id;

    // don't know what's it.
    // original wiki said it's in-game equip type.
    // but it's an array like [6,17,28,23,0]
    // not ship's type or in-game 8 equip type
    delete equip.type_ingame;
}
exports.changeOneEquipObj = changeOneEquipObj;

async function changeOneEquipObjCG(equip) {
    // it's easier than ship cg, we just add cg URI on response.
    // cg are stored in WhoCallsTheFleet-Pics/dist/equipments/
    // just get them via equip id
    var cgURI = config.protocol + config.domain + '/v1/image/equip?eid='
        + equip.id + '&cgid=';
    equip.cg = {};
    equip.cg.card = cgURI + '0';
    equip.cg.character = cgURI + '1';
    equip.cg.char_on_item = cgURI + '2';
    equip.cg.item = cgURI + '3';
    equip.cg.banner = cgURI + '4';
}
exports.changeOneEquipObjCG = changeOneEquipObjCG;