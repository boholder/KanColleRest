import {BaseDao, Datastore, DB_FILE_NAME} from "./base.dao.js";

class ShipNameSuffixDao extends BaseDao {
    static #shipNameSuffixDb = Datastore.create(
        super.buildDbCreationOptionWith(DB_FILE_NAME.ship_name_suffix)
    );

    static async getShipNameSuffixBy(id) {
        // not map to model, only ShipNameModel use it.
        return super.getOneById(this.#shipNameSuffixDb, id, {_id: 0});
    }
}

export {ShipNameSuffixDao};