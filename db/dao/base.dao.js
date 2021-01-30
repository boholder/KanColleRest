import config from "config";
import fs from "fs";
import Datastore from "nedb-promises";
import {logger} from "../../config/winston-logger.js";
import {
    DatabaseInitializingError,
    DatabaseQueryExecuteFailError,
    DatabaseQueryExecuteNoResultError,
    DatabaseQueryFormatError
} from "../../util/error.js";

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
        if (fs.existsSync(dbPath)) {
            // Nedb won't throw error when creating Datastore instance,
            // it just set db file path into instance for further use.
            this.datastore = Datastore.create(
                this.buildDbCreationOptionWith(dbPath)
            );
        } else {
            let initError =
                new DatabaseInitializingError(dbPath, new Error('db file not exists'));
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
            result => {
                let resultIsTrusthyFlag = !!result;
                return this.checkResultThenReturn(result, resultIsTrusthyFlag, id);
            },
            reason => this.rejectAndLogErrorExecuteFailError(reason));
    }

    static checkResultThenReturn(value, condition, query) {
        if (condition) {
            return value;
        } else {
            return this.rejectAndLogWarnNoResultError(
                new Error(`query matched nothing:${JSON.stringify(query)}`));
        }
    }

    /*
    Something bad happened inside nedb.
    Reject with DatabaseQueryExecuteNoResultError,
    then log it at warn level
    */
    static rejectAndLogWarnNoResultError(query) {
        let error = new DatabaseQueryExecuteNoResultError(
            this.getDbNameFrom(this.datastore), query);
        logger.warn(error.toString());
        return Promise.reject(error);
    }

    /*
    Reject with DatabaseQueryExecuteFailError,
    then log it at error level
    */
    static rejectAndLogErrorExecuteFailError(inner = undefined) {
        let error = new DatabaseQueryExecuteFailError(inner);
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
            result => this.checkResultThenReturn(result, result.length > 0, query),
            reason => this.rejectAndLogErrorExecuteFailError(reason)
        );
    }
}

export {DB_FILE_NAME, Datastore, BaseDao};