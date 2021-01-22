import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class MainEquipmentTypeDao extends BaseDao {
    static #mainEquipmentTypeDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.main_equipment_type)
    );
}

export {MainEquipmentTypeDao};
