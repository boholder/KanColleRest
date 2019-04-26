// stackoverflow.com/questions/12030248
// synchronously db query is good for me.

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
    // yeah these connections won't be closed till process is killed.
})

// search ship obj via ship name
async function getShip(query) {
    return dbo.collection('ship').find(query, { "sort": ['id', 'asc'] }).toArray();
}
exports.getShip = getShip;


// get suffix name via suffix.id
async function getSuffix(query) {
    fields = {
        "ja_jp": true,
        "zh_cn": true,
        "ja_romaji": true
    }
    return dbo.collection('ship_namesuffix').findOne(query, fields);
}
exports.getSuffix = getSuffix;


// get type name via type.id
async function getType(query) {
    fields = {
        "name.ja_jp": true,
        "name.zh_cn": true,
        "name.en_us": true
    }
    return dbo.collection('ship_types').findOne(query, fields);
}
exports.getType = getType;


// get class name via class.id
async function getClass(query) {
    fields = {
        "name.ja_jp": true,
        "name.zh_cn": true,
        "name.en_us": true
    }
    return dbo.collection('ship_classes').findOne(query, fields);
}
exports.getClass = getClass;


// get equipment name via id
async function getEquip(query) {
    fields = {
        "name.ja_jp": true,
        "name.zh_cn": true
    }
    return dbo.collection('items').findOne(query, fields);
}
exports.getEquip = getEquip;


// additional_item_types
async function getAddl(query) {
    fields = {
        "name.ja_jp": true,
        "name.zh_cn": true,
        "name.en_us": true
    }
    return dbo.collection('item_types').findOne(query, fields);
}
exports.getAddl = getAddl;


// get illustrator&cv name
async function getPerson(query) {
    fields = {
        "name.ja_jp": true,
        "name.zh_cn": true,
    }
    return dbo.collection('entities').findOne(query, fields);
}
exports.getPerson = getPerson;