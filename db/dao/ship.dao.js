import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";
import {ShipModel} from "../../model/ship.model.js";

class ShipDao extends BaseDao {
    static #shipDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.ship)
    );

    static async getShipBy(id) {
        return ShipModel.build(await super.getOneById(this.#shipDb, id, {_id: 0}));
    }

    static async getShipIdNameBy(id) {
        return new SimplifiedFieldEntityModel(await super.getOneById(this.#shipDb, id, {name: 1, id: 1}));
    }
}

export {ShipDao};