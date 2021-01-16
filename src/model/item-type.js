import {Name} from "./name.js";

class ItemType {
    constructor({
                    id, name,
                    equipable_on_type, main_attribute,
                    equipable_extra_ship, id_ingame, tp
                }) {
        this.id = id;
        this.name = new Name(name);
        this.equipable_ship_types = equipable_on_type;
        this.main_attribute = main_attribute;
        this.equipable_ships = equipable_extra_ship;
        this.id_in_game = id_ingame;
        this.transport_point = tp;
    }
}

const exampleItemTypeJson = {
    "name": {
        "ja_jp": "上陸用舟艇",
        "zh_cn": "登陆艇",
        "en_us": "Landing Craft"
    },
    "icon": 20,
    "equipable_on_type": [12, 15],
    "id": 38,
    "_id": "0mzoj3jBxJLxImCw",
    "main_attribute": "fire",
    "equipable_extra_ship": [
        147, 198, 199, 200, 260, 352,
        418, 434, 435, 450, 464, 468, 469,
        470, 478, 487, 488, 489, 490, 498,
        500, 541, 547, 548, 563, 587, 623,
        630, 703],
    "id_ingame": 24,
    "tp": 8
};
const mockedItemType = new ItemType(exampleItemTypeJson)

export {ItemType, mockedItemType, exampleItemTypeJson};