// DAO functions
var dao = require('./dao');

// ========functions==========

// print out query log on console
function printLog(srcip, api, method, url) {
    var time = new Date();
    console.log('{"time": "' + time.toLocaleString() + '", "srcip": "' + srcip +
        '", "api": "' + api + '", "method": "' + method + '", "url": "' + url + '"}');
}
// use this line, we can call printLog() function in other modules
exports.printLog = printLog;


// ship/info db query constructor
// {"name.??": ?? }
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
exports.shipinfoMainQueryConstructor = shipinfoMainQueryConstructor;


// ship/info related db query
// change main query's result , add more details into it.
async function shipinfoSubQuery(shipObjs) {
    for (var i = 0; i < shipObjs.length; i++) {
        try {
            await changeOneShipObj(shipObjs[i]);
        } catch (err) {
            console.error(err);
        }
    }
}
exports.shipinfoSubQuery = shipinfoSubQuery;


// in shipinfoSubQuery, for each ship data object, replace some values.
async function changeOneShipObj(ship) {
    // namesuffix
    try {
        var suffix = await dao.getSuffix({ id: ship.name.suffix });

        // not initial form
        if (suffix) {
            if (suffix.ja_jp && ship.name.ja_jp)
                ship.name.ja_jp = ship.name.ja_jp + suffix.ja_jp;
            if (suffix.ja_romaji && ship.name.ja_romaji)
                ship.name.ja_romaji = ship.name.ja_romaji + ' ' + suffix.ja_romaji;
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
        var type = await dao.getType({ id: ship.type });

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
        var classname = await dao.getClass({ id: ship.class });

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
        // some ship like maruyu¤Þ¤ë¤æ has no init equip
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
            var equipja_jp = new Array();
            var equipzh_cn = new Array();

            // for each equip,get it's name and add them to array
            for (var i = 0; i < count; i++) {
                var onesolt = ship.equip[i];
                var equip;
                if (typeof onesolt === 'number') {
                    // type = number
                    equip = await dao.getEquip({ id: onesolt });

                    if (equip.name.ja_jp)
                        equipja_jp.push(equip.name.ja_jp);
                    if (equip.name.zh_cn)
                        equipzh_cn.push(equip.name.zh_cn);
                } else {
                    // type = object
                    equip = await dao.getEquip({ id: onesolt.id });

                    // add improvement star
                    if (equip.name.ja_jp)
                        equipja_jp.push(equip.name.ja_jp + '+' + onesolt.star);
                    if (equip.name.zh_cn)
                        equipzh_cn.push(equip.name.zh_cn + '+' + onesolt.star);
                }
            }
            ship.equip = { equipja_jp, equipzh_cn };
        }
    } catch (err) {
        console.error(err);
    }

    // additional_item_types
    try {
        // most of initial form don't has it(empty array [])
        if (ship.additional_item_types) {
            var addlja_jp = new Array();
            var addlzh_cn = new Array();
            var addlen_us = new Array();

            for (var i = 0; i < ship.additional_item_types.length; i++) {
                var onetype = ship.additional_item_types[i];
                var addl = await dao.getAddl({ id: onetype });

                if (addl.name.ja_jp)
                    addlja_jp.push(addl.name.ja_jp);
                if (addl.name.zh_cn)
                    addlzh_cn.push(addl.name.zh_cn);
                if (addl.name.en_us)
                    addlen_us.push(addl.name.en_us);
            }
            ship.additional_item_types = { addlja_jp, addlzh_cn, addlen_us };
        }
    } catch (err) {
        console.error(err);
    }

    // additional_disable_item_types
    try {
        // most of form don't has it(empty array [])
        if (ship.additional_disable_item_types) {
            var addlja_jp = new Array();
            var addlzh_cn = new Array();
            var addlen_us = new Array();

            for (var i = 0; i < ship.additional_disable_item_types.length; i++) {
                var onetype = ship.additional_disable_item_types[i];
                var addl = await dao.getAddl({ id: onetype });

                if (addl.name.ja_jp)
                    addlja_jp.push(addl.name.ja_jp);
                if (addl.name.zh_cn)
                    addlzh_cn.push(addl.name.zh_cn);
                if (addl.name.en_us)
                    addlen_us.push(addl.name.en_us);
            }
            ship.additional_disable_item_types = { addlja_jp, addlzh_cn, addlen_us };
        }
    } catch (err) {
        console.error(err);
    }

    // CV & Illustrator
    try {
        if (ship.rels) {
            if (ship.rels.cv || ship.rels.cv !== '') {
                var name = await dao.getPerson({ id: ship.rels.cv });
                var nameja_jp = '', namezh_cn = '';
                if (name.name.ja_jp)
                    nameja_jp = name.name.ja_jp;
                if (name.name.zh_cn)
                    namezh_cn = name.name.zh_cn;
                ship.rels.cv = { nameja_jp, namezh_cn };
            }
            if (ship.rels.illustrator || ship.rels.illustrator !== '') {
                var name = await dao.getPerson({ id: ship.rels.illustrator });
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


    // delete no use fields
    delete ship.time_created;
    delete ship.time_modified;
    delete ship.illust_extra;
    delete ship.illust_version;
    delete ship._id;
}
exports.changeOneShipObj = changeOneShipObj;