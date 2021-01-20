import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME} from "../database-util.js";
import {logger} from "../../config/winston-logger.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";

const shipDb = Datastore.create(
    buildDbCreationOptionWith(DB_FILE_NAME.ship)
);

async function getShipBy(id) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    }
    let result = await shipDb.findOne({id: id}).catch(
        reason => {
            logger.error(new DatabaseQueryExecuteError('creatorDb', reason));
        }
    );
    return result || {};
}

async function getShipIdNameBy(id) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    }else{
        let result = await shipDb.findOne({id: id}, {name: 1, id: 1}).catch(
            reason => {
                logger.error(new DatabaseQueryExecuteError('creatorDb', reason));
            }
        );
    }
    return result || {};
}

export {shipDb, getShipBy};