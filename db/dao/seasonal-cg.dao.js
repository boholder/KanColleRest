import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class SeasonalCgDao extends BaseDao {
    static #seasonalCgDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.seasonal_cg)
    );
}

export {SeasonalCgDao};