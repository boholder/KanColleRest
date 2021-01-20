import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME} from "../database-util.js";
import {logger} from "../../config/winston-logger.js";
import {DatabaseQueryExecuteError, DatabaseQueryFormatError} from "../../util/error.js";
import {CreatorModel} from "../../model/creator.model";

const creatorDb = Datastore.create(buildDbCreationOptionWith(DB_FILE_NAME.creator));

async function getCreatorBy(id) {
    if (!id) {
        logger.warn(new DatabaseQueryFormatError(id));
        return {};
    }
    let result = new CreatorModel(await creatorDb.findOne(
        {id: id}, {picture: 0}).catch(
        reason => {
            logger.error(new DatabaseQueryExecuteError('creatorDb', reason));
        }
    ));
    return result || {};
}

export {getCreatorBy}