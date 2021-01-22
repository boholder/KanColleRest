/*
database -> ship_type_collections
In Kancolle there are 6 main ship types:
    Destroyer, Cruiser, Submarine, Battleship, Carrier, Others
 */
import {NameModel} from "../name.model.js";
import {FieldEntityArray} from "../simplified-field-entity.model.js";

class ShipMainTypeModel {
    constructor({name, types, id} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        // TODO unfinished
        this.subtype = types || new FieldEntityArray();
    }

    static async build() {

    }
}

export {ShipMainTypeModel};