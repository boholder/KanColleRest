import {logger} from "../../config/winston-logger.js";
import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME, getOneById} from "../database-util.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";

const shipNameSuffixDb = Datastore.create(
    buildDbCreationOptionWith(DB_FILE_NAME.ship_name_suffix)
);

async function getShipNameSuffixBy(id) {
    return getOneById(shipNameSuffixDb, id, {_id: 0});
}

export {getShipNameSuffixBy};