/*
entities.nedb, ship girls' CV & illustrator information
 */
import {Name} from "./name.js";
import {Link} from "./link.js";

class Creator {
    constructor({id, name, relation, links} = {}) {
        this.id = id;
        this.name = new Name(name);
        this.profession = '';
        let ships_created_id_array = this.setProfessionAndReturnProfessionArray(relation);
        // TODO 需要进DB查ID，可以把DAO融合到这一步，算充血模型。
        this.ships_created = ships_created_id_array;
        this.links = Link.buildLinkArray(links);
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

export {Creator};