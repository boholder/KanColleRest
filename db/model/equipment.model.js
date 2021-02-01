import {NameModel} from "./name.model.js";
import {ModelBuildError} from "../../util/error.js";
import {logger} from "../../config/winston-logger.js";

// TODO unfinished, just for developing ship API using
class EquipmentModel {
    constructor({id, name} = {}) {
        this.id = id;
        this.name = new NameModel(name);
    }

    static async build(equip = {}) {
        try {
            return new EquipmentModel(equip);
        } catch (error) {
            logger.warn(
                new ModelBuildError('EquipmentModel', error).toString());
            return new EquipmentModel(equip);
        }
    }
}

export {EquipmentModel};