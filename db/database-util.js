import {CONFIG} from "../config/config-parser.js";
import Datastore from "nedb-promises";
import {logger} from "../config/winston-logger";
import {DatabaseQueryFormatError} from "../util/error";

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

async function getOneById(id, asyncQueryDbFunction) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    } else {
        let result = await asyncQueryDbFunction();
        return result || {};
    }
}

export {buildDbCreationOptionWith, DB_FILE_NAME, Datastore, getOneById};