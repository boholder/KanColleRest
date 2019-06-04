/*
 * read serverconfig.json file, provide config attr to other scripts.
 */

// read server config
var fs = require('fs');
var configfile = './serverconfig.json';
var config = JSON.parse(fs.readFileSync(configfile));

// =======Consts, you'd modify them in serverconfig.json if you need.====

// Mongodb url
// mongodb://user:passwd@ip:dbport/dbname
const mongodb = config.mongodb;

// which port to listen, default is 3000.
const port = config.port;

// server ip,maybe this device have more than one ip?
// for develop I set it to 127.0.0.1,
// but you MUST change it to your server's public IP for web service.
const serverip = config.ip;

// domain defalut localhost:3000
const domain = config.domain;

// kancolle image path,defalut "./"
const imgdirpath = config.image_dir_path;

// HTTPS or not
var protocol = '';
if (config.TLS == 1)
    protocol = 'https://';
else
    protocol = 'http://';

// proxy or not
const proxy = config.proxy;

// =======const end=======

// export them
exports.mongodb = mongodb;
exports.port = port;
exports.serverip = serverip;
exports.domain = domain;
exports.imgdirpath = imgdirpath;
exports.protocol = protocol;
exports.proxy = proxy;