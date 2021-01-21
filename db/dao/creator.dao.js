import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME, getOneById} from "../database-util.js";
import {CreatorModel} from "../../model/creator.model.js";

const creatorDb = Datastore.create(buildDbCreationOptionWith(DB_FILE_NAME.creator));

async function getCreatorBy(id) {
    return CreatorModel.build(await getOneById(creatorDb, id, {picture: 0, _id: 0}));
}

export {getCreatorBy}