import {ModelBuildError} from "../../util/error.js";
import {logger} from "../../config/winston-logger.js";
import {CreatorDao} from "../../db/dao/creator.dao.js";

class CreatorsModel {
    constructor({cv, illustrator} = {}) {
        this.cv = cv;
        this.illustrator = illustrator;
    }

    static async build(creators = {}) {
        try {
            return await this.#buildModel(creators);
        } catch (e) {
            logger.error(
                new ModelBuildError('CreatorsModel', e).toString()
            );
            return new CreatorsModel(creators);
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