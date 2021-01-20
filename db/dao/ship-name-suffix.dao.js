import {logger} from "../../config/winston-logger.js";
import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME} from "../database-util.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";

const shipNameSuffixDb = Datastore.create(
    buildDbCreationOptionWith(DB_FILE_NAME.ship_name_suffix)
);

async function getShipNameSuffixBy(id) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    }
    let result = await shipNameSuffixDb.findOne({id: id}).catch(
        reason => {
            logger.error(new DatabaseQueryExecuteError('shipNameSuffixDb', reason));
        }
    );
    return result || {};
}

export {getShipNameSuffixBy};