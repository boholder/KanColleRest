import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";
import {EquipmentModel} from "../../model/equipment.model.js";

class EquipmentDao extends BaseDao {
    static #equipmentDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.equipment)
    );

    static async getEquipmentBy(id) {
        return EquipmentModel.build(await super.getOneById(this.#equipmentDb, id, {_id: 0}));
    }

    static async getEquipmentIdNameBy(id) {
        return new SimplifiedFieldEntityModel(await super.getOneById(this.#equipmentDb, id, {name: 1, id: 1}));
    }
}


export {EquipmentDao};