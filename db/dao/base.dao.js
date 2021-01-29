import config from "config";
import fs from "fs";
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
        // See if pasted db file exists or not
        let dbPath = this.buildDbPathWith(dbFileName);
        try {
            if (fs.existsSync(dbPath)) {
                // Nedb won't throw error when creating Datastore instance,
                // it just set db file path into instance for further use.
                this.datastore = Datastore.create(
                    this.buildDbCreationOptionWith(dbPath)
                );
            } else {
                throw Error('file not exists');
            }
        } catch (error) {
            let initError = new DatabaseInitializingError(dbPath, error);
            logger.error(initError.toString());
            throw initError;
        }
    }

    static buildDbCreationOptionWith(filePath) {
        return {
            filename: filePath,
            autoload: true
        };
    }

    static buildDbPathWith(dbFileName) {
        return `${DB_FILE_DIR}/${dbFileName}${FILE_SUFFIX}`;
    }

    static async getOneById(id, projection = {}) {
        if (id) {
            return this.findOne(id, projection);
        } else {
            return this.rejectAndLogWarnQueryFormatError(id);
        }
    }

    /*
    Execute query and handle promise type result.
     */
    static async findOne(id, projection) {
        return this.datastore.findOne({id: id}, projection).then(
            result => this.checkResultThenReturn(result, this.checkIdQueryResult(result), id),
            reason => this.rejectAndLog(reason));
    }

    static checkResultThenReturn(value, checkResult, query) {
        // when matches nothing, value is null
        if (checkResult) {
            return value;
        } else {
            return this.rejectAndLogWarnExecuteError(
                new Error(`query matched nothing:${JSON.stringify(query)}`));
        }
    }

    static checkIdQueryResult(result) {
        return result ? true : false;
    }

    static rejectAndLog(reason) {
        // something bad happened inside nedb
        return this.rejectAndLogErrorExecuteError(
            new Error(`query rejected by nedb:${reason}`));
    }

    /*
        log in warn level
         */
    static rejectAndLogWarnExecuteError(inner = undefined) {
        let error = this.warpErrorWithExecuteError(inner);
        logger.warn(error.toString());
        return Promise.reject(error);
    }

    static warpErrorWithExecuteError(inner) {
        let error = new DatabaseQueryExecuteError(this.getDbNameFrom(this.datastore), inner);
        return error;
    }

    /*
    log in error level
     */
    static rejectAndLogErrorExecuteError(inner = undefined) {
        let error = this.warpErrorWithExecuteError(inner);
        logger.error(error.toString());
        return Promise.reject(error);
    }

    /*
        Query|id passed to base dao is falsy,
        can't build a valid query option before execute query.
         */
    static async rejectAndLogWarnQueryFormatError(query) {
        let error = new DatabaseQueryFormatError(query);
        logger.warn(error.toString());
        return Promise.reject(error);
    }

    static getDbNameFrom(datastore) {
        if (datastore) {
            let dbFilePath = datastore.__original.filename;
            let regex = /[a-z]+.nedb/;
            return dbFilePath.match(regex)[0];
        } else {
            return 'falsy_db_name';
        }
    }

    static async getManyByQuery(query, projection = {}) {
        let queryIsTrusthyAndNotEmptyFlag = query && Object.entries(query).length > 0;
        if (queryIsTrusthyAndNotEmptyFlag) {
            return this.findMany(query, projection);
        } else {
            return this.rejectAndLogWarnQueryFormatError(query);
        }
    }

    static async findMany(query, projection) {
        return this.datastore.find(query, projection).then(
            result => this.checkResultThenReturn(result, this.checkNameQueryResult(result), query),
            reason => this.rejectAndLog(reason)
        );
    }

    static checkNameQueryResult(result) {
        // when matches nothing, value is []
        return result.length > 0;
    }
}

export {DB_FILE_NAME, Datastore, BaseDao};