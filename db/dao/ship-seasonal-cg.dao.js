import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {ShipSeasonalCgModel} from "../../model/ship/ship-seasonal-cg.model.js";

class ShipSeasonalCgDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.seasonal_cg);

    static async getModelBy(id) {
        return ShipSeasonalCgModel.build(await super.getOneById(id, {_id: 0}));
    }
}

export {ShipSeasonalCgDao};