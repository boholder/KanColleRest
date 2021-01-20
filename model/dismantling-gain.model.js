"use strict";

/*
Both ship & equipment have dismantle operation.
 */
class DismantlingGainModel {
    constructor([fuel, ammo, steel, bauxite] = []) {
        this.fuel = fuel || NaN;
        this.ammo = ammo || NaN;
        this.steel = steel || NaN;
        this.bauxite = bauxite || NaN;
    }
}

export {DismantlingGainModel};