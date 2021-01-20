/*
entities.nedb, ship girls' CV & illustrator information
 */
import {NameModel} from "./name.model.js";
import {LinkModel} from "./link.model.js";

class CreatorModel {
    constructor({id, name, relation, links} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.profession = '';
        let relative_ships_id_array = this.setProfessionAndReturnProfessionArray(relation);
        // TODO 需要进DB查ID，可以把DAO融合到这一步，算充血模型。
        this.relative_ships = relative_ships_id_array;
        this.links = LinkModel.buildLinkArray(links);
    }

    setProfessionAndReturnProfessionArray(relationJson = {}) {
        let professionKey = Object.keys(relationJson)[0];
        if (professionKey) {
            switch (professionKey) {
                case 'cv':
                    this.profession = 'cv';
                    break;
                case 'illustrator':
                    this.profession = 'illustrator'
                    break;
            }
        } else {
            this.profession = '';
        }
        return relationJson[professionKey] || [];
    }
}

export {CreatorModel};