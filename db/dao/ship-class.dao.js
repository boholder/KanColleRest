import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {ShipClassModel} from "../../model/ship/ship-class.model.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";

class ShipClassDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship_class);

    static async getModelBy(id) {
        return ShipClassModel.build(await super.getOneById(id, {_id: 0}));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(id, {id: 1, name: 1}));
    }
}

export {ShipClassDao};