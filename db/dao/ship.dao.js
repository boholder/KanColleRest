import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {SimplifiedFieldEntityModel} from "../model/simplified-field-entity.model.js";
import {ShipModel} from "../model/ship.model.js";
import {NameModel} from "../model/name.model.js";

export default class ShipDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship);

    static async getModelBy(id) {
        return super.getOneById(id, {_id: 0}).then(
            value => ShipModel.build(value),
            reason => Promise.reject(reason)
        )
    }

    static async getModelsBy(query) {
        return super.getManyByQuery(query, {_id: 0}).then(
            value => ShipModel.buildModelArrayFrom(value),
            reason => Promise.reject(reason)
        );
    }

    static async getIdNameBy(id) {
        return super.getOneById(id, {name: 1, id: 1,_id:0}).then(
            value => SimplifiedFieldEntityModel.build(value),
            reason => Promise.reject(reason)
        );
    }

    static async getRawJsonsBy(query) {
        return super.getManyByQuery(query, {_id: 0}).catch(
            reason => Promise.reject(reason)
        );
    }

    static async getNamesBy(query) {
        return super.getManyByQuery(query, {name: 1,_id:0}).then(
            value => NameModel.buildModelArrayFromEntityArray(value),
            reason => Promise.reject(reason)
        );
    }
}