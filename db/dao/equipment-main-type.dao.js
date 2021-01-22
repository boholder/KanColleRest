import {BaseDao, DB_FILE_NAME} from "./base.dao.js";

class EquipmentMainTypeDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.main_equipment_type);
}

export {EquipmentMainTypeDao};
