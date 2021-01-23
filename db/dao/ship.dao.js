import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";
import {ShipModel} from "../../model/ship.model.js";

class ShipDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship);

    static async getModelBy(id) {
        return ShipModel.build(await super.getOneByIdAndHandleError(id, {_id: 0}));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneByIdAndHandleError(id, {name: 1, id: 1}));
    }
}

export {ShipDao};