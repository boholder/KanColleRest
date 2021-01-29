"use strict";

import {ShipStateModel} from "./ship/ship-state.model.js";
import {ShipNameModel} from "./ship/ship-name.model.js";
import {EquipmentDao} from "../dao/equipment.dao.js";
import {DismantlementGainModel} from "./dismantlement-gain.model.js";
import {ShipModernizationModel} from "./ship/ship-modernization.model.js";
import {RemodelModel} from "./ship/ship-remodel.model.js";
import {EquipmentTypeDao} from "../dao/equipment-type.dao.js";
import {FieldEntityArray} from "./simplified-field-entity.model.js";
import {LinkModel} from "./link.model.js";
import {CapabilitiesModel} from "./ship/ship-capabilities.model.js";
import {ShipCgModel} from "./ship/ship-cg.model.js";
import {ShipTypeDao} from "../dao/ship-type.dao.js";
import {ShipClassDao} from "../dao/ship-class.dao.js";
import {ModelBuildError} from "../../util/error.js";
import {logger} from "../../config/winston-logger.js";
import {CreatorsModel} from "./ship/ship-creators.model.js";
import {ShipTypeModel} from "./ship/ship-type.model.js";
import {ShipClassModel} from "./ship/ship-class.model.js";
import {ShipRareModel} from "./ship/ship-rare.model.js";

/*
It contains one ship girl's information of one model's information.
It represent one record in ships.nedb.
 */
class ShipModel {
    // The origin json contains "class" field,
    // so I can't construct it in constructor parameter.
    constructor(ship = {}) {
        this.id = ship.id;
        this.no = ship.no || NaN;
        this.name = ship.name || ShipNameModel.build();
        this.type = ship.type || ShipTypeModel.build();
        this.class = ship.class || ShipClassModel.build();
        this.class_no = ship.class_no || NaN;
        this.remodel_series_id = ship.series || NaN;
        this.base_level = ship.base_lvl || NaN;
        this.buildtime = ship.buildtime || NaN;
        this.rare = ship.rare || ShipRareModel.build();
        this.state = ShipStateModel.build(ship.stat);
        this.max_consumption = ship.consum || {fuel: NaN, ammo: NaN};
        this.equipment_slot = ship.slot || [];
        this.initial_equipments = ship.equip || [];
        this.dismentlement_gain = DismantlementGainModel.build(ship.scrap);
        this.modernization_provides = ShipModernizationModel.build(ship.modernization);
        this.remodel = RemodelModel.build(ship.remodel, ship.remodel_cost);
        this.additinal_item_types = ship.additinal_item_types || {};
        this.special_capabilities = CapabilitiesModel.build(ship.capabilities);
        this.links = LinkModel.buildLinkArray(ship.links);
        this.relations = ship.rels || CreatorsModel.build();
        this.cg = ship.cg || ShipCgModel.build(ship);
    }

    static async buildModelArrayFrom(queryResultArray) {
        let result = [];
        for (let ship of queryResultArray) {
            try {
                result.push(await this.build(ship));
            }catch (inner){
                await this.#logAndRejectWith(inner);
            }
        }
        return result;
    }

    /*
    This method is used in ship dao,
    it handles errors occurred in dao process
    (i.e. db query process).
     */
    static async build(ship) {
        let paramIsNotEmptyFlag = Object.entries(ship).length > 0;
        if (ship && paramIsNotEmptyFlag) {
            return this.#buildModel(ship).then(
                value => Promise.resolve(value),
                reason => Promise.reject(reason)
            );
        } else {
            return this.#rejectInvalidParam(ship);
        }
    }

    static #rejectInvalidParam(ship) {
        return Promise.reject(new ModelBuildError('ShipModel',
            new Error(`invalid param:${ship}`)));
    }

    static async #buildModel(ship) {
        try {
            return await this.#assembleModelWithParts(ship);
        } catch (inner) {
            return this.#logAndRejectWith(inner);
        }
    }

    static async #assembleModelWithParts(ship) {
        ship.name = await ShipNameModel.build(ship.name);
        // TODO query rare nedb when PR rare db file to WCTF-DB project
        // ship.rare = await ShipRareModel.build(ship.rare);
        ship.type = await ShipTypeDao.getIdNameBy(ship.type);
        ship.class = await ShipClassDao.getIdNameBy(ship.class);
        ship.equip = await this.#getInitEquipsInfoInArray(ship.equip);
        ship.additinal_item_types = await
            FieldEntityArray.buildModelFromIdArray(ship.additional_item_types, EquipmentTypeDao);
        ship.rels = await CreatorsModel.build(ship.rels);
        ship.cg = await ShipCgModel.build(ship);
        return new ShipModel(ship);
    }

    static #logAndRejectWith(inner) {
        let error = new ModelBuildError('ShipModel', inner);
        logger.error(error.toString());
        return Promise.reject(error);
    }

    static async #getInitEquipsInfoInArray(equips = []) {
        let result = [];
        for (let equip of equips) {
            result.push(await this.#queryEquipIdNameFromDb(equip));
        }
        return result;
    }

    static async #queryEquipIdNameFromDb(equip = {}) {
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