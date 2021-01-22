import {NameModel} from "./name.model.js";
import {FieldEntityArray} from "./simplified-field-entity.model.js";

class EquipmentTypeModel {
    constructor({
                    id, name,
                    equipable_on_type, main_attribute,
                    equipable_extra_ship, id_ingame, tp
                } = {}) {
        this.id = id;
        this.name = new NameModel(name);
        // TODO unfinished
        this.equipable_ship_types = equipable_on_type || new FieldEntityArray();
        this.main_attribute = main_attribute || '';
        // TODO unfinished
        this.equipable_ships = equipable_extra_ship || new FieldEntityArray();
        this.id_in_game = id_ingame || NaN;
        this.transport_point = tp || 0;
    }
}

export {EquipmentTypeModel};