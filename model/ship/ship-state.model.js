class ShipStateModel {
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

    static build(state){
        return new ShipStateModel(state);
    }
}

export {ShipStateModel};