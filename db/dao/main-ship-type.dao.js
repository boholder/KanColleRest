import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class MainShipTypeDao extends BaseDao {
    static #mainShipTypeDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.main_ship_type)
    );
}

export {MainShipTypeDao};