import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {ShipTypeModel} from "../../model/ship/ship-type.model.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";

class ShipTypeDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship_type);

    static async getModelBy(id) {
        return ShipTypeModel.build(await super.getOneById(id, {_id: 0}));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(id, {id: 1, name: 1}));
    }
}

export {ShipTypeDao};