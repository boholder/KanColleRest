import {Name} from "./name.js";
import {FieldEntityArray} from "./simplified-field-entity";

class EquipmentType {
    constructor({
                    id, name,
                    equipable_on_type, main_attribute,
                    equipable_extra_ship, id_ingame, tp
                } = {}) {
        this.id = id;
        this.name = new Name(name);
        this.equipable_ship_types = equipable_on_type || new FieldEntityArray();
        this.main_attribute = main_attribute || '';
        this.equipable_ships = equipable_extra_ship || new FieldEntityArray();
        this.id_in_game = id_ingame || NaN;
        this.transport_point = tp || 0;
    }
}

export {EquipmentType};