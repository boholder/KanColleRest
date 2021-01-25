import {NameModel} from "../name.model.js";

class ShipSeasonalCgTypeModel {
    constructor({time, name, id} = {time: {}}) {
        this.id = id;
        this.name = NameModel.build(name);
        this.time = {};
        if (time) {
            this.time.ja_jp = time.ja_jp || '';
            this.time.en_us = time.en_us || '';
            this.time.zh_cn = time.zh_cn || '';
        } else {
            this.time = {ja_jp: '', en_us: '', zh_cn: ''};
        }
    }

    static build(cgType = {}) {
        return new ShipSeasonalCgTypeModel(cgType);
    }
}

export {ShipSeasonalCgTypeModel};