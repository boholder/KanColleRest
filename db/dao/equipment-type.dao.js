import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class EquipmentTypeDao extends BaseDao {
    static #equipmentTypeDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.equipment_type)
    );


    static async getEquipmentTypeBy(id) {
        return super.getOneById(this.#equipmentTypeDb, id, {_id: 0});
    }

    static async getEquipmentTypeIdNameBy(id) {
        return super.getOneById(this.#equipmentTypeDb, id, {id: 1, name: 1});
    }
}


export {EquipmentTypeDao};