import {BaseDao, DB_FILE_NAME} from "./base.dao.js";

class SeasonalCgTypeDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.seasonal_cg_type);

    //TODO unfinished
    static getModelBy(id) {
        return super.getOneById()
    }
}

export {SeasonalCgTypeDao};