import {NameModel} from "./name.model.js";
import {ModelBuildError} from "../util/error.js";
import {logger} from "../config/winston-logger.js"

/*
This kind of requirement is very common in this project:
    a field in a main model is the id of another sub model
    (e.g. ship:{initial_equipment:[equip_id1,equip_id2...]}),
    and we need to query database for its detailed information.
However, it is sort of cumbersome to pass
    a complete set of attributes of this field model
    as a single field of main model.
So we can declare a simplified entity,
    which containing only the id and name (necessary information),
    to replace the complete sub model information.
 */
class SimplifiedFieldEntityModel {
    constructor({id, name} = {}) {
        this.id = id;
        this.name = new NameModel(name);
    }

    static build(entity) {
        return new SimplifiedFieldEntityModel(entity);
    }
}

/*
Sometimes main model's sub model field is an array,
    so instead of letting API user take value from each mockedSimplifiedFieldEntity instance,
    we can put these value into different array for convenient.
 */
class FieldEntityArray extends Array {
    constructor(fieldEntityArray = []) {
        super();
        this.id = [];
        this.name = {};
        this.name.ja_jp = [];
        this.name.en_us = [];
        this.name.zh_cn = [];
        for (let entity of fieldEntityArray) {
            this.id.push(entity.id);
            let entityName = entity.name;
            this.name.ja_jp.push(entityName.ja_jp);
            this.name.en_us.push(entityName.en_us);
            this.name.zh_cn.push(entityName.zh_cn);
        }
    }

    static buildModelFromEntityArray(fieldEntityArray = []) {
        return new FieldEntityArray(fieldEntityArray);
    }

    static async buildModelFromIdArray(idArray = [], dao) {
        let entityArray = [];
        try {
            for (let id of idArray) {
                // only need one id since their name is same (only suffix is diff).
                let entity = await dao.getIdNameBy(id);
                entityArray.push(entity);
            }
        } catch (e) {
            logger.error(
                new ModelBuildError('FieldEntityArray', e)
            );
            return FieldEntityArray.buildModelFromEntityArray();
        }
        return FieldEntityArray.buildModelFromEntityArray(entityArray);
    }
}

export {SimplifiedFieldEntityModel, FieldEntityArray}