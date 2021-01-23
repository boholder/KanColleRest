import config from "config";
import Datastore from "nedb-promises";
import {logger} from "../../config/winston-logger.js";
import {DatabaseInitializingError, DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";

const FILE_SUFFIX = '.nedb';
const DB_FILE_NAME = config.get("resource.datasource.nedb_file_names");
const DB_FILE_DIR = config.get("resource.datasource.nedb_database_file_dir");

/*
It used to be a util class,
    but I don't want to repeat error handling code in every dao class,
    so I make them inherit from this class,
    and writing error handling code in getOneByIdAndHandleError method.
Decorator mode is ideal,
    but I don't want to manually add decorator wrapper every time I use dao.
This approach is very tempting, and I am not sure if this is correct (in JavaScript language).
 */
class BaseDao {
    static datastore = null;

    static initDatastoreWith(dbFileName) {
        try {
            this.datastore = Datastore.create(
                this.buildDbCreationOptionWith(dbFileName)
            );
        } catch (error) {
            logger.error(
                new DatabaseInitializingError(dbFileName, error).toString());
        }
    }

    static buildDbCreationOptionWith(dbFileName) {
        return {
            filename: this.buildDbPathWith(dbFileName),
            autoload: true
        };
    }

    static buildDbPathWith(dbFileName) {
        return `${DB_FILE_DIR}/${dbFileName}${FILE_SUFFIX}`;
    }

    static async getOneByIdAndHandleError(id, projection = {}) {
        if (!id) {
            logger.warn(new DatabaseQueryFormatError(id));
            return {};
        } else {
            let result = await this.datastore.findOne({id: id}, projection).catch(
                reason => {
                    logger.error(
                        new DatabaseQueryExecuteError(
                            this.#getDbNameFrom(this.datastore),
                            new Error(reason)).toString());
                });
            return result || {};
        }
    }

    static #getDbNameFrom(datastore) {
        if (datastore) {
            let dbFilePath = datastore.__original.filename;
            let regex = /([a-z]+).nedb/;
            return dbFilePath.match(regex)[1];
        } else {
            return 'corrupted_database';
        }
    }
}


export {DB_FILE_NAME, Datastore, BaseDao};