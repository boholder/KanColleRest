"use strict";

/*
Classes in this file represent data structures in ships.nedb.
 */
import {ShipStateModel} from "./ship/ship-state.model.js";
import {ShipNameModel} from "./ship/ship-name.model";
import {ShipTypeModel} from "./ship/ship-type.model";
import {ShipClassModel} from "./ship/ship-class.model";
import {ShipRareModel} from "./ship/ship-rare.model";
import {EquipmentDao} from "../db/dao/equipment.dao";
import {DismantlementGainModel} from "./dismantlement-gain.model";
import {ModernizationModel} from "./ship/ship-modernization.model";
import {RemodelModel} from "./ship/ship-remodel.model";
import {EquipmentTypeDao} from "../db/dao/equipment-type.dao";
import {CreatorsModel} from "./ship/ship-creators.model";
import {FieldEntityArray} from "./simplified-field-entity.model";
import {LinkModel} from "./link.model";
import {CapabilitiesModel} from "./ship/ship-capabilities.model";


/*
It contains one ship girl's information of one model's information.
 */
class ShipModel {
    // The origin json contains "class" field so I can't construct it in constructor parameter.
    constructor(ship = {}) {
        this.id = ship.id;
        this.no = ship.no;
        this.name = ShipNameModel.build(ship.name);
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
        this.modernization_provides = ModernizationModel.build(ship.modernization);
        this.remodel = RemodelModel.build(ship.remodel, ship.remodel_cost);
        this.additinal_item_types = ship.additinal_item_types;
        this.links = LinkModel.buildLinkArray(ship.links);
        this.special_capabilities = CapabilitiesModel.build(ship.capabilities);
        // TODO CG & seasonal CG not added yet
    }

    static async build(ship) {
        ship.rare = await ShipRareModel.build(ship.rare);
        ship.type = await ShipTypeModel.build(ship.type);
        ship.class = await ShipClassModel.build(ship.class);
        ship.equip = await this.#queryInitEquipsInfoAndBuildArray(ship.equip);
        ship.additinal_item_types = await
            FieldEntityArray.buildModelFromIdArray(ship.additional_item_types, EquipmentTypeDao.getIdNameBy);
        ship.rels = await CreatorsModel.build(ship.rels);
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
        } else if (equip instanceof Number) {
            let result = await EquipmentDao.getIdNameBy(equip);
            result.improvement_star = 0;
            return result;
        }
    }
}

export {ShipModel};