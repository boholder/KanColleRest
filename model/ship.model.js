"use strict";

/*
Classes in this file represent data structures in ships.nedb.
 */
import {CreatorModel} from "./creator.model.js";
import {ShipNameModel} from "./name.model.js";

class ShipState {
    constructor({
                    fire, fire_max,
                    torpedo, torpedo_max,
                    aa, aa_max,
                    asw, asw_max,
                    hp, hp_max,
                    armor, armor_max,
                    evasion, evasion_max,
                    carry, speed, range,
                    los, los_max,
                    luck, luck_max
                } = {}) {

        this.fire = fire || NaN;
        this.fire_max = fire_max || NaN;
        this.torpedo = torpedo || NaN;
        this.torpedo_max = torpedo_max || NaN;
        this.anti_air = aa || NaN;
        this.anti_air_max = aa_max || NaN;
        this.anti_submarine = asw || NaN;
        this.anti_submarine_max = asw_max || NaN;
        this.hp = hp || NaN;
        this.hp_max = hp_max || NaN;
        this.armor = armor || NaN;
        this.armor_max = armor_max || NaN;
        this.evasion = evasion || NaN;
        this.evasion_max = evasion_max || NaN;
        this.carry = carry || NaN;
        this.speed = speed || NaN;
        this.range = range || NaN;
        this.line_of_sight = los || NaN;
        this.line_of_sight_max = los_max || NaN;
        this.luck = luck || NaN;
        this.luck_max = luck_max || NaN;
    }
}

class Modernization {
    // But there are only 4-length arrays in nedb file in fact.
    // Use "modernization":\[\d,\d,\d,\d,\d] regex to check it.
    constructor([fire, torp, aa, armor, luck] = []) {
        this.fire = fire || NaN;
        this.torpedo = torp || NaN;
        this.anti_air = aa || NaN;
        this.armor = armor || NaN;
        this.luck = luck || NaN;
    }
}

class Remodel {
    constructor({prev, prev_loop, next, next_lvl, next_loop} = {}, {ammo, steel} = {}) {
        this.prev = {};
        this.prev.ship_id = prev || NaN;
        this.prev.have_more_than_one_prev_form = prev_loop || false;

        this.next = {};
        this.next.ship_id = next || NaN;
        this.next.level_request = next_lvl || NaN;
        this.next.have_more_than_one_next_form = next_loop || false;

        this.next.cost = {};
        this.next.cost.ammo = ammo || NaN;
        this.next.cost.steel = steel || NaN;
    }
}

class Creators {
    constructor({cv, illustrator} = {}) {
        this.cv = new CreatorModel(cv);
        this.illustrator = new CreatorModel(illustrator);
    }

    // TODO 把cv illust id 查DB转成JSON，所有model都这样，负责查询id并构造本model下的属性model
}

class Capabilities {
    constructor({
                    count_as_landing_craft,
                    count_as_night_operation_aviation_personnel,
                    participate_night_battle_when_equip_swordfish
                } = {}) {
        this.count_as_landing_craft = count_as_landing_craft ? true : false;
        this.count_as_night_operation_aviation_personnel = count_as_night_operation_aviation_personnel ? true : false;
        this.participate_night_battle_when_equip_swordfish = participate_night_battle_when_equip_swordfish ? true : false;
    }
}


/*
It contains one ship girl's information of one model.
 */
class ShipModel {
    // TODO add ship cg & extra cg field
    // The origin json contains "class" field so I can't construct it in constructor parameter.
    constructor(ship = {}) {
        this.id = ship.id;
        this.no = ship.no;
        this.name = new ShipNameModel(ship.name);
        this.state = new ShipState(ship.stat);
        // TODO unfinished
    }
}

export {ShipModel, ShipState, Modernization, Remodel, Creators, Capabilities};