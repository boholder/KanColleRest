/*
 * Data access functions.(db query)
 */

// stackoverflow.com/questions/12030248
// synchronously db query is good.

// read server config
var fs = require('fs');
var file = './serverconfig.json';
var config = JSON.parse(fs.readFileSync(file));

// Mongodb url
const mongodb = config.mongodb;
// kancolle database name (or other name, whatever)
const kcdb = config.kcdb;
// database object
var dbo;

var MongoClient = require('mongodb').MongoClient;

// start connect and maintain a connection pool(by mongodb module).
MongoClient.connect(mongodb, { useNewUrlParser: true }, function (err, db) {
    // no auth, do we really need it?
    if (err) console.error(err);
    else dbo = db.db(kcdb);
    // yeah these connections won't be closed till process end.
})

// search ship obj via ship name
async function getShip(query) {
    return dbo.collection('ship').
        find(query, { "sort": ['id', 'asc'] }).toArray();
}
// use this line, we can call this function in other modules
exports.getShip = getShip;


// get suffix name via suffix.id
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


// get type name via type.id
async function getType(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship_types')
        .findOne(query, { projection: fields });
}
exports.getType = getType;


// get class name via class.id
async function getClass(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship_classes')
        .findOne(query, { projection: fields });
}
exports.getClass = getClass;


// get equipment name via id
async function getEquipName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('items')
        .findOne(query, { projection: fields });
}
exports.getEquipName = getEquipName;

// get all equipment data via id
async function getEquip(query) {
    return dbo.collection('items')
        .find(query, { "sort": ['id', 'asc'] }).toArray();
}
exports.getEquip = getEquip;

// additional_item_types
async function getAddl(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('item_types')
        .findOne(query, { projection: fields });
}
exports.getAddl = getAddl;


// get illustrator&cv name
async function getPerson(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('entities')
        .findOne(query, { projection: fields });
}
exports.getPerson = getPerson;

// get equip type name via id
async function getEquipType(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('item_types')
        .findOne(query, { projection: fields });
}
exports.getEquipType = getEquipType;

// get ship name via id
async function getShipName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('ship')
        .findOne(query, { projection: fields });
}
exports.getShipName = getShipName;

// get consumables via id
async function getConsumableName(query) {
    var fields = {
        "name": true
    }
    return dbo.collection('consumables')
        .findOne(query, { projection: fields });
}
exports.getConsumableName = getConsumableName;

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