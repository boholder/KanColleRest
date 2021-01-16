"use strict";

class DismantlementGain {
    constructor([fuel, ammo, steel, bauxite]) {
        this.fuel = fuel;
        this.ammo = ammo;
        this.steel = steel;
        this.bauxite = bauxite;
    }
}

const exampleDismantlementGainArray = [1, 2, 10, 0];
const mockedDismantlementGain = new DismantlementGain(exampleDismantlementGainArray);
export { DismantlementGain, mockedDismantlementGain };