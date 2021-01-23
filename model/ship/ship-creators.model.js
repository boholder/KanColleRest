import {CreatorModel} from "../creator.model.js";
import {ModelBuildError} from "../util/error.js";
import {logger} from "../../config/winston-logger.js";

class CreatorsModel {
    constructor({cv, illustrator} = {}) {
        this.cv = cv;
        this.illustrator = illustrator;
    }

    static async build(creators = {}) {
        try {
            return this.buildModel(creators);
        } catch (e) {
            logger.error(
                new ModelBuildError('CreatorsModel', e)
            );
            return new CreatorsModel(creators);
        }
    }

    static buildModel(creators) {
        creators.cv = CreatorModel.buildModel(creators.cv);
        creators.illustrator = CreatorModel.buildModel(creators.illustrator);
        return new CreatorModel(creators);
    }
}

export {CreatorsModel};