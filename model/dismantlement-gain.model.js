"use strict";

/*
Both ship & equipment have dismantle operation.
 */

class DismantlementGainModel {
    constructor([fuel, ammo, steel, bauxite] = []) {
        this.fuel = fuel || 0;
        this.ammo = ammo || 0;
        this.steel = steel || 0;
        this.bauxite = bauxite || 0;
    }

    static build(dismantlementArray = []) {
        return new DismantlementGainModel(dismantlementArray);
    }
}

export {DismantlementGainModel};