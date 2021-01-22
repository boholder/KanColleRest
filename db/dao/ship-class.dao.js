import {Datastore, DB_FILE_NAME} from "./base.dao.js";
import {ShipClassModel} from "../../model/ship/ship-class.model.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";

class ShipClassDao {
    static #shipClassDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.ship_class)
    );

    static async getShipClassBy(id) {
        return ShipClassModel.build(await super.getOneById(this.#shipClassDb, id, {_id: 0}));
    }

    static async getShipClassIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(this.#shipClassDb, id, {id: 1, name: 1}));
    }
}

export {ShipClassDao};