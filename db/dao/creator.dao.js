import {BaseDao, DB_FILE_NAME} from "./base.dao.js";
import {CreatorModel} from "../../model/creator.model.js";

class CreatorDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.creator);

    static async getModelBy(id) {
        return CreatorModel.buildModel(await super.getOneByIdAndHandleError(id, {picture: 0, _id: 0}));
    }
}


export {CreatorDao}