import {CONFIG} from "../config/config-parser.js";
import Datastore from "nedb-promises";
import {logger} from "../config/winston-logger.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../util/error.js";

const FILE_SUFFIX = '.nedb';
const DB_FILE_NAME = CONFIG.datasource.nedbFileName;
const DB_FILE_DIR = CONFIG.datasource.nedbFileDir;

function buildDbPathWith(dbFileName) {
    return `${DB_FILE_DIR}/${dbFileName}${FILE_SUFFIX}`;
}

function buildDbCreationOptionWith(dbFileName) {
    return {
        filename: buildDbPathWith(dbFileName),
        autoload: true
    };
}

async function getOneById(datastore, id, projection={}) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    } else {
        let result = await datastore.findOne({id: id}, projection).catch(
            reason => {
                logger.error(new DatabaseQueryExecuteError(getDbNameFrom(datastore), reason));
            });
        return result || {};
    }
}

function getDbNameFrom(datastore) {
    let dbFilePath = datastore.__original.filename;
    let regex = /([a-z]+).nedb/;
    return dbFilePath.match(regex)[1];
}

export {buildDbCreationOptionWith, DB_FILE_NAME, Datastore, getOneById};