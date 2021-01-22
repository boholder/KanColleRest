import {BaseDao, DB_FILE_NAME} from "./base.dao.js";

class ShipMainTypeDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.main_ship_type);
}

export {ShipMainTypeDao};