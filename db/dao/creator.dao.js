import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME, getOneById} from "../database-util.js";

const creatorDb = Datastore.create(buildDbCreationOptionWith(DB_FILE_NAME.creator));

async function getCreatorBy(id) {
    return getOneById(creatorDb, id, {picture: 0, _id: 0});
}

export {getCreatorBy}