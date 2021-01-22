import {BaseDao, DB_FILE_NAME} from "./base.dao.js";

class SeasonalCgDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.seasonal_cg);
    // TODO unfinished
}

export {SeasonalCgDao};