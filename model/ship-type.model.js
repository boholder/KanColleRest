import {NameModel} from "./name.model.js";
import {FieldEntityArray} from "./simplified-field-entity.model.js";

/*
 database -> ship_types.nedb
 */
class ShipTypeModel {
    constructor({id, code, code_game, equipable, name, tp} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.code = code || '';
        this.code_in_game = code_game || '';
        this.equipable_equipment = equipable || new FieldEntityArray();
        this.transport_point = tp || 0;
    }
}

/*
database -> ship_type_order.nedb
Dont know why Diablohu add this layer of type,
    maybe it's part of his application "WhoCallsTheFleet" UI(View) data.
example:
    {"name":{"zh_cn":"重巡洋舰"},"types":[4,23],"id":8,"_id":"wmWibyU0nQd9BlHU"} in ship_type_order.nedb
    corresponding two records in ship_types.nedb:
        1.{"code":"CA","code_game":"重巡","id":23,"_id":"ymhRPe8aNS7rkWsG",
        "equipable":[4,7,8,9,10,12,15,16,24,25,28,29,30,31,32,33,35,37,39,40,43,48,64],
        "name":{"en_us":"Anti-Air Heavy Cruiser","ja_jp":"防空重巡洋艦","zh_cn":"防空重巡洋舰"},
        "hide":true}
        2.{"id":4,"code":"CA","code_game":"重巡","_id":"ZhdM4QnIYs0Gvd0t",
        "equipable":[4,7,8,9,10,12,15,16,24,25,28,29,30,31,32,33,35,37,39,40,43,48,64],
        "name":{"en_us":"Heavy Cruiser","ja_jp":"重巡洋艦","zh_cn":"重巡洋舰"}}
 */

/*
database -> ship_type_collections
In Kancolle there are 6 main ship types:
    Destroyer, Cruiser, Submarine, Battleship, Carrier, Others
 */
class MainShipTypeModel {
    constructor({name, types, id} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.subtype = types || new FieldEntityArray();
    }
}

export {ShipTypeModel, MainShipTypeModel}