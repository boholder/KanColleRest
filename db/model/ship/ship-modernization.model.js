class ShipModernizationModel {
    // But there are only 4-length arrays in nedb file in fact.
    // Use "modernization":\[\d,\d,\d,\d,\d] regex to check it.
    constructor([fire, torp, aa, armor, luck] = []) {
        this.fire = fire || 0;
        this.torpedo = torp || 0;
        this.anti_air = aa || 0;
        this.armor = armor || 0;
        this.luck = luck || NaN;
    }

    static build(modernizationArray = []) {
        return new ShipModernizationModel(modernizationArray);
    }
}

export {ShipModernizationModel};