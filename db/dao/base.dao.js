import config from "config";
import Datastore from "nedb-promises";
import {logger} from "../../config/winston-logger.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";

const FILE_SUFFIX = '.nedb';
const DB_FILE_NAME = config.get("resource.datasource.nedb_file_names");
const DB_FILE_DIR = config.get("resource.datasource.nedb_database_file_dir");

class BaseDao {

    static buildDbPathWith(dbFileName) {
        return `${DB_FILE_DIR}/${dbFileName}${FILE_SUFFIX}`;
    }

    static buildDbCreationOptionWith(dbFileName) {
        return {
            filename: this.buildDbPathWith(dbFileName),
            autoload: true
        };
    }

    static async getOneById(datastore, id, projection = {}) {
        if (!id) {
            logger.warn(new DatabaseQueryFormatError(id));
            return {};
        } else {
            let result = await datastore.findOne({id: id}, projection).catch(
                reason => {
                    logger.error(new DatabaseQueryExecuteError(this.getDbNameFrom(datastore), reason));
                });
            return result || {};
        }
    }

    static getDbNameFrom(datastore) {
        let dbFilePath = datastore.__original.filename;
        let regex = /([a-z]+).nedb/;
        return dbFilePath.match(regex)[1];
    }
}


export {DB_FILE_NAME, Datastore, BaseDao};