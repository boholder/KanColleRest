class ModernizationModel {
    // But there are only 4-length arrays in nedb file in fact.
    // Use "modernization":\[\d,\d,\d,\d,\d] regex to check it.
    constructor([fire, torp, aa, armor, luck] = []) {
        this.fire = fire || NaN;
        this.torpedo = torp || NaN;
        this.anti_air = aa || NaN;
        this.armor = armor || NaN;
        this.luck = luck || NaN;
    }

    static build(modernizationArray){
        return new ModernizationModel(modernizationArray);
    }
}

export {ModernizationModel};