"use strict";

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
                }) {

        this.fire = fire;
        this.fire_max = fire_max;
        this.torpedo = torpedo;
        this.torpedo_max = torpedo_max;
        this.anti_air = aa;
        this.anti_air_max = aa_max;
        this.anti_submarine = asw;
        this.anti_submarine_max = asw_max;
        this.hp = hp;
        this.hp_max = hp_max;
        this.armor = armor;
        this.armor_max = armor_max;
        this.evasion = evasion;
        this.evasion_max = evasion_max;
        this.carry = carry;
        this.speed = speed;
        this.range = range;
        this.line_of_sight = los;
        this.line_of_sight_max = los_max;
        this.luck = luck;
        this.luck_max = luck_max;
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
    constructor([fire, torp, aa, armor, luck]) {
        this.fire = fire;
        this.torpedo = torp;
        this.anti_air = aa;
        this.armor = armor;
        this.luck = luck;
    }
}

const exampleModernizationGainArray = [2, 2, 1, 1];
const mockedModernizationGain = new Modernization(exampleModernizationGainArray);

class Remodel {
    constructor({prev, prev_loop, next, next_lvl, next_loop}, {ammo, steel}) {
        this.prev = {};
        this.prev.ship_id = prev;
        this.prev.have_more_than_one_prev_form = prev_loop || NaN;

        this.next = {};
        this.next.ship_id = next;
        this.next.level_request = next_lvl;
        this.next.have_more_than_one_next_form = next_loop || NaN;

        this.next.cost = {};
        this.next.cost.ammo = ammo;
        this.next.cost.steel = steel;
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

console.log(mockedRemodel);