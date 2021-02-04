import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../model/simplified-field-entity.model.js";
import {ShipRarityModel} from "../model/ship/ship-rarity.model.js";

class ShipRarityDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship_rare);

    static async getModelBy(id) {
        return ShipRarityModel.build(await super.getOneById(id));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(id, {id: 1, name: 1}));
    }
}

export {ShipRarityDao};