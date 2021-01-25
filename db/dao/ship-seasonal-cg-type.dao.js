import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {ShipSeasonalCgTypeModel} from "../../model/ship/ship-seasonal-cg-type.model.js";

class ShipSeasonalCgTypeDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.seasonal_cg_type);

    static async getModelBy(id) {
        return ShipSeasonalCgTypeModel.build(await super.getOneById(id, {_id: 0}));
    }
}

export {ShipSeasonalCgTypeDao};