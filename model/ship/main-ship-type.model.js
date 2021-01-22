/*
database -> ship_type_collections
In Kancolle there are 6 main ship types:
    Destroyer, Cruiser, Submarine, Battleship, Carrier, Others
 */
import {NameModel} from "../name.model";
import {FieldEntityArray} from "../simplified-field-entity.model";

class MainShipTypeModel {
    constructor({name, types, id} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.subtype = types || new FieldEntityArray();
    }
}

export {MainShipTypeModel};