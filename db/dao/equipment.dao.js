import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../../model/simplified-field-entity.model.js";
import {EquipmentModel} from "../../model/equipment.model.js";

class EquipmentDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.equipment);

    static async getModelBy(id) {
        return EquipmentModel.build(await super.getOneById(id, {_id: 0}));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(id, {name: 1, id: 1}));
    }
}


export {EquipmentDao};