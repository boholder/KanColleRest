import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {CreatorModel} from "../model/creator.model.js";
import {SimplifiedFieldEntityModel} from "../model/simplified-field-entity.model.js";

class CreatorDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.creator);

    static async getModelBy(id) {
        return CreatorModel.build(await super.getOneById(id, {picture: 0, _id: 0}));
    }

    static async getIdNameBy(id) {
        return SimplifiedFieldEntityModel.build(await super.getOneById(id, {name: 1, id: 1}));
    }
}


export {CreatorDao}