import {NameModel} from "../name.model.js";

class ShipRarityModel {
    constructor({id, name} = {}) {
        this.id = id || NaN;
        this.name = NameModel.build(name);
    }

    // TODO query rare nedb when PR rare db file to WCTF-DB project
    // now rare is a number stands for rare rank.
    static build(rare = {}) {
        return new ShipRarityModel(rare);
    }
}

export {ShipRarityModel};