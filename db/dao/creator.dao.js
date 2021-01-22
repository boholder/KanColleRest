import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";
import {CreatorModel} from "../../model/creator.model.js";

class CreatorDao extends BaseDao {
    static #creatorDb = Datastore.create(super.buildDbCreationOptionWith(DB_FILE_NAME.creator));

    static async getCreatorBy(id) {
        return CreatorModel.build(await super.getOneById(this.#creatorDb, id, {picture: 0, _id: 0}));
    }
}


export {CreatorDao}