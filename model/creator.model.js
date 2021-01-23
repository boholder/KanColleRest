/*
entities.nedb, ship girls' CV & illustrator information
 */
import {NameModel} from "./name.model.js";
import {LinkModel} from "./link.model.js";
import {ShipDao} from "../db/dao/ship.dao.js";
import {FieldEntityArray} from "./simplified-field-entity.model.js";
import {logger} from "../config/winston-logger.js";
import {ModelBuildError} from "../util/error.js";

class CreatorModel {
    constructor({id, name, relation, links, profession} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.profession = profession || '';
        this.relative_ships = relation || '';
        this.links = LinkModel.buildLinkArray(links);
    }

    static async build(creator = {}) {
        try {
            return await this.#buildModel(creator);
        } catch (error) {
            logger.error(new ModelBuildError('CreatorModel', error).toString());
            return new CreatorModel(creator);
        }
    }

    static async #buildModel(creator = {}) {
        let relationJson = creator.relation || {};
        creator.profession = this.#getProfessionFrom(relationJson);
        // array is 2-dim, each subarray is a ship's all models id:
        // [[id1,id2,id3],[id1,id2],...]
        let relativeShipsIdArray = relationJson[creator.profession] || [];
        creator.relation = await this.#getShipIdNameFromDbBy(relativeShipsIdArray);
        return new CreatorModel(creator);
    }

    static #getProfessionFrom(relationJson = {}) {
        let professionKey = Object.keys(relationJson)[0];
        if (professionKey) {
            switch (professionKey) {
                case 'cv':
                    return 'cv';
                case 'illustrator':
                    return 'illustrator'
            }
        } else {
            return '';
        }

    }

    static async #getShipIdNameFromDbBy(shipIdArray = []) {
        let idArray = [];
        for (let subArray of shipIdArray) {
            // only need one id since their name is same (only suffix is diff)
            idArray.push(subArray[0]);
        }
        return FieldEntityArray.buildModelFromIdArray(idArray, ShipDao);
    }
}

export {CreatorModel};