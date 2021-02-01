/*
database -> ship_type_collections
In Kancolle there are 6 main ship types:
    Destroyer, Cruiser, Submarine, Battleship, Carrier, Others
 */
import {NameModel} from "../name.model.js";
import {FieldEntityArray} from "../simplified-field-entity.model.js";
import {ModelBuildError} from "../../../util/error.js";
import {logger} from "../../../config/winston-logger.js";

class ShipMainTypeModel {
    constructor({name, types, id} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        // TODO unfinished
        this.subtype = types || new FieldEntityArray();
    }

    static async build(type) {
        try {
            return new ShipMainTypeModel(type);
        } catch (e) {
            logger.warn(
                new ModelBuildError('ShipMainTypeModel', e).toString()
            );
            return new ShipMainTypeModel();
        }
    }
}

export {ShipMainTypeModel};