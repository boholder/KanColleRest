/*
 * This js is called by index.js, and calls DbAccess.js
 * These functions change result that ship/info,ship/cg api response contains.
 */

// DAO functions
var DbAccess = require('./DbAccess');

// get config consts
const config = require('./config')

// ========functions==========

// ship/info db query json constructor
// return example: {"name.??": ?? }
// seems i can't use variable to format query obj's key
function shipinfoMainQueryConstructor(matchfmt, match) {
    // regex query, name contains this match str
    // fuzzy search
    match = '.*' + match + '.*';

    if (matchfmt == 'zh_cn') {
        var query = {
            "name.zh_cn": { $regex: match }
        };
        return query;
    }
    if (matchfmt == 'ja_kana') {
        var query = {
            "name.ja_kana": { $regex: match }
        };
        return query;
    }
    if (matchfmt == 'ja_jp') {
        var query = {
            "name.ja_jp": { $regex: match }
        };
        return query;
    }
    if (matchfmt == 'ja_romaji') {
        var query = {
            "name.ja_romaji": { $regex: match.toLowerCase() }
        };
        return query;
    }
}
// use this line, we can call this function in other modules
exports.shipinfoMainQueryConstructor = shipinfoMainQueryConstructor;


// ship/info related db query
// change main query's result , add more details into it.
async function shipinfoSubQuery(shipObjs, qtype) {
    if (qtype === 'info') {
        for (var i = 0; i < shipObjs.length; i++) {
            try {
                await changeOneShipObj(shipObjs[i]);
            } catch (err) {
                console.error(err);
            }
        }
    }

    if (qtype === 'cg') {
        for (var i = 0; i < shipObjs.length; i++) {
            try {
                await changeOneShipObjCG(shipObjs[i]);
            } catch (err) {
                console.error(err);
            }
        }
    }
}
exports.shipinfoSubQuery = shipinfoSubQuery;


// in shipinfoSubQuery, for each ship data object, replace some values.
async function changeOneShipObj(ship) {
    // namesuffix
    try {
        var suffix = await DbAccess.getSuffix({ id: ship.name.suffix });

        // not initial form
        if (suffix) {
            if (suffix.ja_jp && ship.name.ja_jp)
                ship.name.ja_jp = ship.name.ja_jp + suffix.ja_jp;
            if (suffix.ja_romaji && ship.name.ja_romaji)
                ship.name.ja_romaji = ship.name.ja_romaji + ' '
                    + suffix.ja_romaji;
            if (suffix.zh_cn && ship.name.zh_cn)
                ship.name.zh_cn = ship.name.zh_cn + suffix.zh_cn;
        }
    } catch (err) {
        console.error(err);
    }
    delete ship.name.suffix;
    delete ship.name.en_us;

    // type
    try {
        var type = await DbAccess.getType({ id: ship.type });

        var ja_jp = null, en_us = null, zh_cn = null;
        if (type.name.ja_jp)
            ja_jp = type.name.ja_jp;
        if (type.name.en_us)
            en_us = type.name.en_us;
        if (type.name.zh_cn)
            zh_cn = type.name.zh_cn;

        ship.type = { ja_jp, en_us, zh_cn };
    } catch (err) {
        console.error(err);
    }

    // class
    try {
        var classname = await DbAccess.getClass({ id: ship.class });

        var ja_jp = null, en_us = null, zh_cn = null;
        if (classname.name.ja_jp)
            ja_jp = classname.name.ja_jp;
        if (classname.name.en_us)
            en_us = classname.name.en_us;
        if (classname.name.zh_cn)
            zh_cn = classname.name.zh_cn;

        ship.class = { ja_jp, en_us, zh_cn };
    } catch (err) {
        console.error(err);
    }
    delete ship.serires;

    // equipment
    // example, 4 slots, [id,id,{id,star},'']
    try {
        // some ship like maruyu�ޤ�� has no init equip
        if (ship.equip) {
            // count equip number
            // example, 4 slots, [id,id,{id,star},'']
            var count = 0;
            for (var i = 0; i < ship.equip.length; i++) {
                if (ship.equip[i] !== '')
                    count++;
                else
                    break;
            }

            // construct two array,ja_jp&zh_cn
            var ja_jp = new Array();
            var zh_cn = new Array();

            // for each equip,get it's name and add them to array
            for (var i = 0; i < count; i++) {
                var oneslot = ship.equip[i];
                var equip;
                if (!oneslot) {
                    //oneslot is null
                    ja_jp.push('');
                    zh_cn.push('');
                } else if (typeof oneslot === 'number') {
                    // type = number
                    equip = await DbAccess.getEquipName({ id: oneslot });

                    if (equip.name.ja_jp)
                        ja_jp.push(equip.name.ja_jp);
                    if (equip.name.zh_cn)
                        zh_cn.push(equip.name.zh_cn);
                } else if (typeof oneslot === 'object') {
                    // type = object
                    equip = await DbAccess.getEquipName({ id: oneslot.id });

                    // add improvement star
                    if (equip.name.ja_jp)
                        ja_jp.push(equip.name.ja_jp + '+' + oneslot.star);
                    if (equip.name.zh_cn)
                        zh_cn.push(equip.name.zh_cn + '+' + oneslot.star);
                }
            }
            ship.equip = { ja_jp, zh_cn };
        }
    } catch (err) {
        console.error(err);
    }

    // additional_item_types
    try {
        // most of initial form don't has it(empty array [])
        if (ship.additional_item_types) {
            var ja_jp = new Array();
            var zh_cn = new Array();
            var en_us = new Array();

            for (var i = 0; i < ship.additional_item_types.length; i++) {
                var onetype = ship.additional_item_types[i];
                var addl = await DbAccess.getAddl({ id: onetype });

                if (addl.name.ja_jp)
                    ja_jp.push(addl.name.ja_jp);
                if (addl.name.zh_cn)
                    zh_cn.push(addl.name.zh_cn);
                if (addl.name.en_us)
                    en_us.push(addl.name.en_us);
            }
            ship.additional_item_types = { ja_jp, zh_cn, en_us };
        }
    } catch (err) {
        console.error(err);
    }

    // additional_disable_item_types
    try {
        // most of form don't has it(empty array [])
        if (ship.additional_disable_item_types) {
            var ja_jp = new Array();
            var zh_cn = new Array();
            var en_us = new Array();

            for (var i = 0; i < ship.additional_disable_item_types.length;
                i++) {
                var onetype = ship.additional_disable_item_types[i];
                var addl = await DbAccess.getAddl({ id: onetype });

                if (addl.name.ja_jp)
                    ja_jp.push(addl.name.ja_jp);
                if (addl.name.zh_cn)
                    zh_cn.push(addl.name.zh_cn);
                if (addl.name.en_us)
                    en_us.push(addl.name.en_us);
            }
            ship.additional_disable_item_types = { ja_jp, zh_cn, en_us };
        }
    } catch (err) {
        console.error(err);
    }

    // CV & Illustrator
    try {
        if (ship.rels) {
            if (ship.rels.cv || ship.rels.cv !== '') {
                var name = await DbAccess.getPerson({ id: ship.rels.cv });
                var nameja_jp = '', namezh_cn = '';
                if (name.name.ja_jp)
                    nameja_jp = name.name.ja_jp;
                if (name.name.zh_cn)
                    namezh_cn = name.name.zh_cn;
                ship.rels.cv = { nameja_jp, namezh_cn };
            }
            if (ship.rels.illustrator || ship.rels.illustrator !== '') {
                var name = await DbAccess.
                    getPerson({ id: ship.rels.illustrator });
                var nameja_jp = '', namezh_cn = '';
                if (name.name.ja_jp)
                    nameja_jp = name.name.ja_jp;
                if (name.name.zh_cn)
                    namezh_cn = name.name.zh_cn;
                ship.rels.illustrator = { nameja_jp, namezh_cn };
            }
        }

    } catch (err) {
        console.error(err);
    }

    // scrap, readable
    var fuel = ship.scrap[0],
        ammo = ship.scrap[1],
        steel = ship.scrap[2],
        bauxite = ship.scrap[3];
    ship.scrap = { fuel, ammo, steel, bauxite };

    // modernization, readable
    var fire = ship.modernization[0],
        trop = ship.modernization[1],
        aa = ship.modernization[2],
        armor = ship.modernization[3];

    // but it seems no luk param in dataset
    if (ship.modernization.length === 5) {
        // this ship provide luk-up
        var luk = ship.modernization[4];
        ship.modernization = { fire, trop, aa, armor, luk };
    } else {
        ship.modernization = { fire, trop, aa, armor };
    }

    // delete no use fields
    delete ship.time_created;
    delete ship.time_modified;
    delete ship.illust_extra;
    delete ship.illust_version;
    delete ship._id;
}
exports.changeOneShipObj = changeOneShipObj;

async function changeOneShipObjCG(ship) {
    //===========modify original result START=========
    // namesuffix
    try {
        var suffix = await DbAccess.getSuffix({ id: ship.name.suffix });

        // not initial form
        if (suffix) {
            if (suffix.ja_jp && ship.name.ja_jp)
                ship.name.ja_jp = ship.name.ja_jp + suffix.ja_jp;
            if (suffix.ja_romaji && ship.name.ja_romaji)
                ship.name.ja_romaji = ship.name.ja_romaji + ' '
                    + suffix.ja_romaji;
            if (suffix.zh_cn && ship.name.zh_cn)
                ship.name.zh_cn = ship.name.zh_cn + suffix.zh_cn;
        }
    } catch (err) {
        console.error(err);
    }
    delete ship.name.suffix;
    delete ship.name.en_us;

    // Illustrator
    try {
        if (ship.rels) {
            if (ship.rels.illustrator || ship.rels.illustrator !== '') {
                var name = await DbAccess.
                    getPerson({ id: ship.rels.illustrator });
                var ja_jp = '', zh_cn = '';
                if (name.name.ja_jp)
                    ja_jp = name.name.ja_jp;
                if (name.name.zh_cn)
                    zh_cn = name.name.zh_cn;
                ship.rels.illustrator = { ja_jp, zh_cn };
            }
        }

    } catch (err) {
        console.error(err);
    }
    ship.illustrator = ship.rels.illustrator;
    delete ship.rels;

    //===========modify original result END=========

    //===========construct cg URI START=========
    {
        // normal ship cg is stored in /WhoCallsTheFleet-Pics/dist/ships/
        // ship.id is also the cg directory's name.
        var cgURI = config.protocol + config.domain +
            '/v1/image/ship?shipid=' + ship.id + '&cgid=';
        ship.cg = { normal: {} };
        ship.cg.normal.banner = cgURI + '0';
        ship.cg.normal.banner_dmged = cgURI + '1';
        ship.cg.normal.card = cgURI + '2';
        ship.cg.normal.card_dmged = cgURI + '3';
        ship.cg.normal.no_contour = cgURI + '8';
        ship.cg.normal.no_contour_dmged = cgURI + '9';

        // extra cg are stored in WhoCallsTheFleet-Pics/dist/ships-extra/
        // find them via ship.illust_extra array param
        try {
            if (ship.illust_extra) {
                var excgURI = new Array();
                for (var i = 0; i < ship.illust_extra.length; i++) {
                    var queryex = await DbAccess.
                        getExtraCGType({ id: ship.illust_extra[i] });
                    var no_contour = cgURI + '10' + ship.illust_extra[i],
                        no_contour_dmged = cgURI + '11' + ship.illust_extra[i];
                    var exURI = { no_contour, no_contour_dmged },
                        name = queryex.name,
                        time = queryex.time;
                    excgURI.push({ name, time, exURI });
                }
                ship.cg.extra = excgURI;
            }
        } catch (err) {
            console.error(err);
        }
        delete illust_extra;
    }
    //===========construct cg URI END=========
}
exports.changeOneShipObjCG = changeOneShipObjCG;