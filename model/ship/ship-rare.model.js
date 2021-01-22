import {NameModel} from "../name.model";

class ShipRareModel {
    constructor({rank, name} = {}) {
        this.rank = rank || NaN;
        this.name = NameModel.build(name);
    }

    // TODO query rare nedb when PR rare db file to WCTF-DB project
    static build(rare = {}) {
        return new ShipRareModel(rare);
    }
}

export {ShipRareModel};