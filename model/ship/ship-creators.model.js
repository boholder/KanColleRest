import {CreatorModel} from "../creator.model.js";

class CreatorsModel {
    constructor({cv, illustrator} = {}) {
        this.cv = cv;
        this.illustrator = illustrator;
    }

    static async build(creators = {}) {
        creators.cv = CreatorModel.build(creators.cv);
        creators.illustrator = CreatorModel.build(creators.illustrator);
        return new CreatorModel(creators);
    }
}

export {CreatorsModel};