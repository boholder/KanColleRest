import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class SeasonalCgTypeDao extends BaseDao {
    static #seasonalCgTypeDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.seasonal_cg_type)
    );
}

export {SeasonalCgTypeDao};