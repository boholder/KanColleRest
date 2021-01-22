"use strict";

/*
Classes in this file represent data structures in ships.nedb.
 */
import {ShipStateModel} from "./ship/ship-state.model.js";
import {ShipNameModel} from "./ship/ship-name.model";
import {EquipmentDao} from "../db/dao/equipment.dao";
import {DismantlementGainModel} from "./dismantlement-gain.model";
import {ShipModernizationModel} from "./ship/ship-modernization.model";
import {RemodelModel} from "./ship/ship-remodel.model";
import {EquipmentTypeDao} from "../db/dao/equipment-type.dao";
import {FieldEntityArray} from "./simplified-field-entity.model";
import {LinkModel} from "./link.model";
import {CapabilitiesModel} from "./ship/ship-capabilities.model";
import {ShipCgModel} from "./ship/ship-cg.model";
import {ShipTypeDao} from "../db/dao/ship-type.dao";
import {ShipClassDao} from "../db/dao/ship-class.dao";
import {CreatorDao} from "../db/dao/creator.dao";


/*
It contains one ship girl's information of one model's information.
 */
class ShipModel {
    // The origin json contains "class" field so I can't construct it in constructor parameter.
    constructor(ship = {}) {
        this.id = ship.id;
        this.no = ship.no;
        this.name = ship.name;
        this.type = ship.type;
        this.class = ship.class;
        this.class_no = ship.class_no;
        this.remodel_series_id = ship.series;
        this.base_level = ship.base_lvl;
        this.buildtime = ship.buildtime;
        this.rare = ship.rare;
        this.state = ShipStateModel.build(ship.stat);
        this.max_consumption = ship.consum;
        this.equipment_slot = ship.slot;
        this.initial_equipments = ship.equip;
        this.dismentlement_gain = DismantlementGainModel.build(ship.scrap);
        this.modernization_provides = ShipModernizationModel.build(ship.modernization);
        this.remodel = RemodelModel.build(ship.remodel, ship.remodel_cost);
        this.additinal_item_types = ship.additinal_item_types;
        this.links = LinkModel.buildLinkArray(ship.links);
        this.special_capabilities = CapabilitiesModel.build(ship.capabilities);
        this.cg = ship.cg;
    }

    static async build(ship) {
        ship.name = await ShipNameModel.build(ship.name);
        // TODO query rare nedb when PR rare db file to WCTF-DB project
        // ship.rare = await ShipRareModel.build(ship.rare);
        ship.type = await ShipTypeDao.getModelBy(ship.type);
        ship.class = await ShipClassDao.getModelBy(ship.class);
        ship.equip = await this.#queryInitEquipsInfoAndBuildArray(ship.equip);
        ship.additinal_item_types = await
            FieldEntityArray.buildModelFromIdArray(ship.additional_item_types, EquipmentTypeDao);
        ship.rels = await CreatorDao.getModelBy(ship.rels);
        ship.cg = await ShipCgModel.build(ship);
        return new ShipModel(ship);
    }

    static async #queryInitEquipsInfoAndBuildArray(equips) {
        let result = [];
        for (let equip of equips) {
            result.push(await this.#queryEquipNameFromDbAndBuildModel(equip));
        }
        return result;
    }

    static async #queryEquipNameFromDbAndBuildModel(equip = {}) {
        if (equip instanceof Object) {
            let result = await EquipmentDao.getIdNameBy(equip.id);
            result.improvement_star = equip.star;
            return result;
        } else if (typeof equip === 'number') {
            let result = await EquipmentDao.getIdNameBy(equip);
            result.improvement_star = 0;
            return result;
        }
    }
}

export {ShipModel};