import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {ShipNameSuffixModel} from "../../model/ship/ship-name-suffix.model.js";

class ShipNameSuffixDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship_name_suffix);

    static async getModelBy(id) {
        // not map to model, only ShipNameModel use it.
        return ShipNameSuffixModel.build(await super.getOneByIdAndHandleError(id, {_id: 0}));
    }
}

export {ShipNameSuffixDao};