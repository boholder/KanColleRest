import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";
import {ShipTypeModel} from "../../model/ship/ship-type.model.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";

class ShipTypeDao extends BaseDao {
    static #shipTypeDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.ship_type)
    );

    static async getShipTypeBy(id) {
        return ShipTypeModel.build(await super.getOneById(this.#shipTypeDb, id, {_id: 0}));
    }

    static async getShipTypeIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(this.#shipTypeDb, id, {id: 1, name: 1}));
    }
}

export {ShipTypeDao};