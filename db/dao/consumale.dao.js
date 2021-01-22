import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME} from "./base.dao.js";

class ConsumaleDao {
    static #consumableDb = Datastore.create(
        buildDbCreationOptionWith(DB_FILE_NAME.consumable)
    );
}

export {ConsumaleDao}