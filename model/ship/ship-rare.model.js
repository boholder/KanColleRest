import {NameModel} from "../name.model";

class ShipRareModel {
    constructor({rank, name} = {}) {
        this.rank = rank || NaN;
        this.name = NameModel.build(name);
    }

    static build(rare = {}) {
        return new ShipRareModel(rare);
    }
}

export {ShipRareModel};