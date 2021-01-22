class CapabilitiesModel {
    constructor({
                    count_as_landing_craft,
                    count_as_night_operation_aviation_personnel,
                    participate_night_battle_when_equip_swordfish
                } = {}) {
        this.count_as_landing_craft = count_as_landing_craft ? true : false;
        this.count_as_night_operation_aviation_personnel = count_as_night_operation_aviation_personnel ? true : false;
        this.participate_night_battle_when_equip_swordfish = participate_night_battle_when_equip_swordfish ? true : false;
    }

    static build(capabilities = {}) {
        return new CapabilitiesModel(capabilities);
    }
}

export {CapabilitiesModel};