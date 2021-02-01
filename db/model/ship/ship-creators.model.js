import {ModelBuildError} from "../../../util/error.js";
import {logger} from "../../../config/winston-logger.js";
import {CreatorDao} from "../../dao/creator.dao.js";
import {SimplifiedFieldEntityModel} from "../simplified-field-entity.model.js";

class CreatorsModel {
    constructor({cv, illustrator} = {}) {
        this.cv = cv || new SimplifiedFieldEntityModel();
        this.illustrator = illustrator || new SimplifiedFieldEntityModel();
    }

    static async build(creators = {}) {
        try {
            return await this.#buildModel(creators);
        } catch (e) {
            logger.warn(
                new ModelBuildError('CreatorsModel', e).toString()
            );
            return new CreatorsModel();
        }
    }

    static async #buildModel(creators) {
        if (typeof creators.cv === 'number') {
            creators.cv = await CreatorDao.getIdNameBy(creators.cv);
        }
        if (typeof creators.illustrator === 'number') {
            creators.illustrator = await CreatorDao.getIdNameBy(creators.illustrator);
        }
        return new CreatorsModel(creators);
    }
}

export {CreatorsModel};