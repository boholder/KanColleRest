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

    static async getOneById(id, projection = {}) {
        if (id) {
            return await this.findOne(id, projection);
        } else {
            logger.warn(new DatabaseQueryFormatError(id).toString());
            return {};
        }
    }

    static async findOne(id, projection) {
        // TODO check error handle when missing db file
        return this.datastore.findOne({id: id}, projection).then(
            value => {
                if (value) {
                    return value;
                } else {
                    // query id isn't in db, value is null
                    this.rejectWithError(id);
                }
            }, reason => {
                // something bad happened inside nedb
                logger.error(
                    this.buildDatabaseQueryExecuteError(
                        new Error(reason).toString()));
            });
    }

    static rejectWithError(query) {
        let error = this.buildDatabaseQueryExecuteError(
            new DatabaseQueryFormatError(query));
        logger.warn(error.toString());
        throw error;
    }

    static buildDatabaseQueryExecuteError(innerError) {
        return new DatabaseQueryExecuteError(
            this.getDbNameFrom(this.datastore),
            innerError);
    }

    static getDbNameFrom(datastore) {
        if (datastore) {
            let dbFilePath = datastore.__original.filename;
            let regex = /([a-z]+).nedb/;
            return dbFilePath.match(regex)[1];
        } else {
            return 'corrupted_database';
        }
    }

    static async getManyByQuery(query, projection = {}) {
        if (query) {
            return await this.findMany(query, projection);
        } else {
            logger.warn(new DatabaseQueryFormatError(query).toString());
            return [];
        }
    }

    static async findMany(query, projection) {
        return this.datastore.find(query, projection).then(
            value => {
                if (value) {
                    return value;
                } else {
                    this.rejectWithError(query);
                }
            }, reason => {
                logger.error(
                    this.buildDatabaseQueryExecuteError(
                        new Error(reason).toString()));
            });
    }
}


export {DB_FILE_NAME, Datastore, BaseDao};