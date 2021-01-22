"use strict";

/*
Both ship & equipment have dismantle operation.
 */
class DismantlementGainModel {
    constructor([fuel, ammo, steel, bauxite] = []) {
        this.fuel = fuel || NaN;
        this.ammo = ammo || NaN;
        this.steel = steel || NaN;
        this.bauxite = bauxite || NaN;
    }

    static build(dismantlementArray=[]){
        return new DismantlementGainModel(dismantlementArray);
    }
}

export {DismantlementGainModel};