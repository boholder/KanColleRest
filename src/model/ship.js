"use strict";

/*
Classes in this file represent data structures in ships.nedb.
 */
import {Creator} from "./creator.js";

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

const exampleShipStateJson = {
    "fire": 12,
    "fire_max": 49,
    "torpedo": 28,
    "torpedo_max": 79,
    "aa": 15,
    "aa_max": 49,
    "asw": 24,
    "asw_max": 59,
    "hp": 30,
    "hp_max": 48,
    "armor": 14,
    "armor_max": 49,
    "evasion": 45,
    "evasion_max": 89,
    "carry": 0,
    "speed": 10,
    "range": 1,
    "los": 7,
    "los_max": 39,
    "luck": 12,
    "luck_max": 59
};
const mockedShipState = new ShipState(exampleShipStateJson);

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

const exampleModernizationGainArray = [2, 2, 1, 1];
const mockedModernizationGain = new Modernization(exampleModernizationGainArray);

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

const exampleRemodelJson = {
    "prev": 44,
    "next": 498,
    "next_lvl": 70
};
const exampleRemodelCostJson = {
    "ammo": 180,
    "steel": 120
}
const mockedRemodel = new Remodel(exampleRemodelJson, exampleRemodelCostJson);

class Creators {
    constructor({cv, illustrator} = {}) {
        this.cv = new Creator(cv);
        this.illustrator = new Creator(illustrator);
    }

    // TODO 把cv illust id 查DB转成JSON，所有model都这样，负责查询id并构造本model下的属性model
}

const exampleCreatorsJson = {
    "cv": 15,
    "illustrator": 35
};
const mockedCreators = new Creators(exampleCreatorsJson);

class Capabilities {

}

class SeasonalCG {

}