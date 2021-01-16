'use strict'

/*
 * Data access functions.(db query)
 */

// stackoverflow.com/questions/12030248
// synchronously db query is awesome.

// read server config
const config = require('../config/configParser.js');

// database object
var dbo;

var MongoClient = require('mongodb').MongoClient;
exports.MongoClient = MongoClient;

// start connect and maintain a connection pool(by mongodb module).
MongoClient.connect(config.mongodb,
    { useNewUrlParser: true },
    function (err, db) {
        // no auth, do we really need it?
        if (err) console.error(err);
        else dbo = db.db(config.kcdb);
        // yeah these connections won't be closed till process end.
    })

/**
 * search ship obj via ship name
 * @method getShip
 * @param {} query
 * @return CallExpression
 */
async function getShip(query) {
    return dbo.collection('ship').
        find(query, { "sort": ['id', 'asc'] }).toArray();
}
// use this line, we can call this function in other modules
exports.getShip = getShip;

/**
 * get suffix name via suffix.id
 * @method getSuffix
 * @param {} query
 * @return CallExpression
 */
async function getSuffix(query) {
    var fields = {
        "ja_jp": true,
        "zh_cn": true,
        "ja_romaji": true
    }
    return dbo.collection('ship_namesuffix')
        .findOne(query, { projection: fields });
}
exports.getSuffix = getSuffix;
 
/**
 * get type name via type.id
 * @method getType
 * @param {} query
 * @return CallExpression
 */
async function getType(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship_types')
        .findOne(query, { projection: fields });
}
exports.getType = getType;

/**
 * get class name via class.id
 * @method getClass
 * @param {} query
 * @return CallExpression
 */
async function getClass(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship_classes')
        .findOne(query, { projection: fields });
}
exports.getClass = getClass;
 
/**
 * get equipment name via id
 * @method getEquipName
 * @param {} query
 * @return CallExpression
 */
async function getEquipName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('items')
        .findOne(query, { projection: fields });
}
exports.getEquipName = getEquipName;
 
/**
 * get all equipment data via id
 * @method getEquip
 * @param {} query
 * @return CallExpression
 */
async function getEquip(query) {
    return dbo.collection('items')
        .find(query, { "sort": ['id', 'asc'] }).toArray();
}
exports.getEquip = getEquip;
 
/**
 * additional_item_types
 * @method getAddl
 * @param {} query
 * @return CallExpression
 */
async function getAddl(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('item_types')
        .findOne(query, { projection: fields });
}
exports.getAddl = getAddl;

/**
 * get illustrator&cv name
 * @method getPerson
 * @param {} query
 * @return CallExpression
 */
async function getPerson(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('entities')
        .findOne(query, { projection: fields });
}
exports.getPerson = getPerson;

/**
 * get equip type name via id
 * @method getEquipType
 * @param {} query
 * @return CallExpression
 */
async function getEquipType(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('item_types')
        .findOne(query, { projection: fields });
}
exports.getEquipType = getEquipType;

/**
 * get ship name via id
 * @method getShipName
 * @param {} query
 * @return CallExpression
 */
async function getShipName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship')
        .findOne(query, { projection: fields });
}
exports.getShipName = getShipName;

/**
 * get consumables via id
 * @method getConsumableName
 * @param {} query
 * @return CallExpression
 */
async function getConsumableName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('consumables')
        .findOne(query, { projection: fields });
}
exports.getConsumableName = getConsumableName;

/**
 * for ship/cg api, just get part of ship data
 * @method getShipPartForCG
 * @param {} query
 * @return CallExpression
 */
async function getShipPartForCG(query) {
    var fields = {
        "name": true,
        "id": true,
        "no": true,
        "links": true,
        "illstrator": true,
        "rels": true,
        "illust_extra": true,
        "_id": false
    }
    return dbo.collection('ship')
        .find(query, { projection: fields }).toArray();
}
exports.getShipPartForCG = getShipPartForCG;

/**
 * get extra cg typeid via id, then get type's data
 * @method getExtraCGType
 * @param {} query
 * @return CallExpression
 */
async function getExtraCGType(query) {
    var excg = await dbo.collection('exillusts').findOne(query);
    var cgtype = excg.type;
    var fields = {
        "name": true,
        "time": true,
    }
    var typequery = { id: cgtype };
    return dbo.collection('exillust_types')
        .findOne(typequery, { projection: fields });
}
exports.getExtraCGType = getExtraCGType;

/**
 * for equip/cg api, just get part of equip data
 * @method getEquipPartForCG
 * @param {} query
 * @return CallExpression
 */
async function getEquipPartForCG(query) {
    var fields = {
        "name": true,
        "id": true,
        "_id": false
    }
    return dbo.collection('items')
        .find(query, { projection: fields }).toArray();
}
exports.getEquipPartForCG = getEquipPartForCG;