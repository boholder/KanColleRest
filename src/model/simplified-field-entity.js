/*
This kind of requirement is very common in this project:
    a field in a main model is the id of another sub model
    (e.g. ship:{initial_equipment:[equip_id1,equip_id2...]}),
    and we need to query database for its detailed information.
However, it is sort of cumbersome to pass a complete set of attributes of this field model
    as a single field of main model.
So we can declare a simplified entity,
    which containing only the id and name (necessary information),
    to replace the complete sub model information.
 */
import {exampleItemTypeJson} from "./item-type.js";
import {Name} from "./name";

class SimplifiedFieldEntity {
    constructor({id, name}) {
        this.id = id;
        this.name = new Name(name);
    }
}

/*
{
    "id": 38,
    "name": {
        "ja_jp": "上陸用舟艇",
        "zh_cn": "登陆艇",
        "en_us": "Landing Craft",
        "ja_kana": ""
    }
}
 */
const mockedSimplifiedFieldEntity = new SimplifiedFieldEntity(exampleItemTypeJson);

/*
Sometimes main model's sub model field is an array,
    so instead of letting API user take value from each mockedSimplifiedFieldEntity instance,
    we can put these value into different array for convenient.
 */
class FieldEntityArray {
    constructor(fieldEntityArray = []) {
        this.id = [];
        this.name = {};
        this.name.ja_jp = [];
        this.name.en_us = [];
        this.name.zh_cn = [];
        this.name.ja_kana = [];
        for (let entity of fieldEntityArray) {
            this.id.push(entity.id);
            let entityName = entity.name;
            this.name.ja_jp.push(entityName.ja_jp);
            this.name.en_us.push(entityName.en_us);
            this.name.zh_cn.push(entityName.zh_cn);
            this.name.ja_kana.push(entityName.ja_kana);
        }
    }
}

/*
FieldEntityArray {
  id: [ 38 ],
  name: { ja_jp: [ '上陸用舟艇' ], en_us: [ 'Landing Craft' ], zh_cn: [ '登陆艇' ], ja_kana: [] }
}
 */
const mockedFieldEntityArray = new FieldEntityArray([mockedSimplifiedFieldEntity]);
export {SimplifiedFieldEntity, FieldEntityArray, mockedFieldEntityArray}