import {DismantlementGainModel} from "./dismantlement-gain.model.js";
import {CreatorModel} from "./creator.model.js";
import {EquipmentTypeModel} from "./equipment-type.model.js";
import {LinkModel} from "./link.model.js";
import {ShipTypeModel} from "./ship/ship-type.model.js";
import {FieldEntityArray, SimplifiedFieldEntityModel} from "./simplified-field-entity.model.js";
import {ShipClassModel} from "./ship/ship-class.model.js";
import {ShipModel} from "./ship.model.js";
import {ShipStateModel} from "./ship/ship-state.model";
import {ModernizationModel} from "./ship/ship-modernization.model";
import {RemodelModel} from "./ship/ship-remodel.model";
import {CreatorsModel} from "./ship/ship-creators.model";
import {CapabilitiesModel} from "./ship/ship-capabilities.model";
import {ShipNameModel} from "./ship/ship-name.model";
import {ShipMainTypeModel} from "./ship/ship-main-type.model";

const exampleDismantlingGainArray = [1, 2, 10, 0];
const mockedDismantlingGain = new DismantlementGainModel(exampleDismantlingGainArray);
export {mockedDismantlingGain};

const exampleCreatorJson = {
    "name": {
        "ja_jp": "茅野 愛衣",
        "zh_cn": "茅野 爱衣"
    },
    "id": 50,
    "_id": "0oEakt9n3ujetpWh",
    "picture": {
        "avatar": "data:image/jpeg;base64, image data on here but i deleted them"
    },
    "links": [
        {
            "name": "Wikipedia",
            "url": "https://ja.wikipedia.org/wiki/%E8%8C%85%E9%87%8E%E6%84%9B%E8%A1%A3"
        }
    ],
    "relation": {
        "cv": [
            [
                332,
                430
            ],
            [
                154,
                343
            ],
            [
                465,
                356
            ],
            [
                454,
                354
            ],
            [
                425,
                344,
                578
            ],
            [
                431,
                334,
                436
            ]
        ]
    }
};
const mockedCreator = CreatorModel.build(exampleCreatorJson);
export {mockedCreator};

const exampleEquipTypeJson = {
    "name": {
        "ja_jp": "上陸用舟艇",
        "zh_cn": "登陆艇",
        "en_us": "Landing Craft"
    },
    "icon": 20,
    "equipable_on_type": [12, 15],
    "id": 38,
    "_id": "0mzoj3jBxJLxImCw",
    "main_attribute": "fire",
    "equipable_extra_ship": [
        147, 198, 199, 200, 260, 352,
        418, 434, 435, 450, 464, 468, 469,
        470, 478, 487, 488, 489, 490, 498,
        500, 541, 547, 548, 563, 587, 623,
        630, 703],
    "id_ingame": 24,
    "tp": 8
};
const mockedEquipType = new EquipmentTypeModel(exampleEquipTypeJson)
export {mockedEquipType, exampleEquipTypeJson};

const exampleLinkArrayJson = [{
    "name": "Wikipedia",
    "url": "https://ja.wikipedia.org/wiki/%E8%8C%85%E9%87%8E%E6%84%9B%E8%A1%A3"
}]
const mockedLinkArray = LinkModel.buildLinkArray(exampleLinkArrayJson);

const exampleShipTypeJson = {
    "id": 1,
    "code": "DD",
    "code_game": "駆逐",
    "_id": "NkAIZy0T53JXtl5i",
    "equipable": [1, 2, 3, 12, 24, 26, 27, 29, 30, 31, 32, 35, 37, 39, 40, 41, 44, 48],
    "name": {"en_us": "Destroyer", "ja_jp": "駆逐艦", "zh_cn": "驱逐舰"},
    "tp": 5
}
const mockedShipType = ShipTypeModel.build(exampleShipTypeJson);
const exampleMainShipTypeJson = {
    "name": {"zh_cn": "驱逐舰", "en_us": "Destroyers", "ja_jp": "駆逐艦"},
    "types": [[1, 19]],
    "id": 4,
    "_id": "STrlqZfKVFD8K7Vw"
}
const mockedMainShipType = new ShipMainTypeModel(exampleMainShipTypeJson);
export {mockedMainShipType};
export {mockedShipType};

const mockedSimplifiedFieldEntity = new SimplifiedFieldEntityModel(exampleEquipTypeJson);
const mockedFieldEntityArray = new FieldEntityArray([mockedSimplifiedFieldEntity]);
export {mockedFieldEntityArray};

const exampleShipClassJson = {
    "ship_type_id": 1,
    "id": 19,
    "_id": "D8Fb8K8IZYvwA4nk",
    "speed_rule": "high-3",
    "name": {"en_us": "Shiratsuyu", "ja_jp": "白露", "zh_cn": "白露"}
};
const mockedShipClass = new ShipClassModel(exampleShipClassJson)
export {mockedShipClass};

const exampleShipStateJson = {
    "fire": 12,
    "fire_max": 49,
    "torpedo": 28,
    "torpedo_max": 79,
    "aa": 15,
    "aa_max": 49,
    "asw": 24,
    "asw_max": 59,
    "hp": 30,
    "hp_max": 48,
    "armor": 14,
    "armor_max": 49,
    "evasion": 45,
    "evasion_max": 89,
    "carry": 0,
    "speed": 10,
    "range": 1,
    "los": 7,
    "los_max": 39,
    "luck": 12,
    "luck_max": 59
};
const mockedShipState = new ShipStateModel(exampleShipStateJson);

const exampleModernizationGainArray = [2, 2, 1, 1];
const mockedModernizationGain = new ModernizationModel(exampleModernizationGainArray);

const exampleRemodelJson = {
    "prev": 44,
    "next": 498,
    "next_lvl": 70
};
const exampleRemodelCostJson = {
    "ammo": 180,
    "steel": 120
}
const mockedRemodel = new RemodelModel(exampleRemodelJson, exampleRemodelCostJson);

const exampleCreatorsJson = {
    "cv": 15,
    "illustrator": 35
};
const mockedCreators = new CreatorsModel(exampleCreatorsJson);

const exampleCapabilitiesJson = {"count_as_night_operation_aviation_personnel": 1};
const mockedCapabilities = new CapabilitiesModel(exampleCreatorsJson);

const exampleShipModelJson = {
    "id": 244,
    "no": 1344,
    "name": {
        "ja_jp": "村雨",
        "ja_kana": "むらさめ",
        "ja_romaji": "murasame",
        "zh_cn": "村雨",
        "en_us": "",
        "suffix": 1
    },
    "stat": {
        "fire": 12,
        "fire_max": 49,
        "torpedo": 28,
        "torpedo_max": 79,
        "aa": 15,
        "aa_max": 49,
        "asw": 24,
        "asw_max": 59,
        "hp": 30,
        "hp_max": 48,
        "armor": 14,
        "armor_max": 49,
        "evasion": 45,
        "evasion_max": 89,
        "carry": 0,
        "speed": 10,
        "range": 1,
        "los": 7,
        "los_max": 39,
        "luck": 12,
        "luck_max": 59
    },
    "consum": {
        "fuel": 15,
        "ammo": 20
    },
    "slot": [
        0,
        0,
        0
    ],
    "equip": [
        2,
        15,
        null
    ],
    "rels": {
        "cv": 15,
        "illustrator": 35
    },
    "type": 1,
    "class": 19,
    "class_no": 3,
    "series": 33,
    "base_lvl": 20,
    "links": [
        {
            "name": "日文WIKI",
            "url": "http://wikiwiki.jp/kancolle/?%C2%BC%B1%AB%B2%FE"
        },
        {
            "name": "英文WIKI",
            "url": "http://kancolle.wikia.com/wiki/Murasame"
        }
    ],
    "time_created": 1425631692872,
    "_id": "ZjMAP8Itc51FsqG9",
    "time_modified": 1608409919904,
    "buildtime": 22,
    "rare": 4,
    "remodel_cost": {
        "ammo": 200,
        "steel": 180
    },
    "scrap": [
        1,
        2,
        10,
        0
    ],
    "modernization": [
        1,
        1,
        1,
        1
    ],
    "remodel": {
        "prev": 44,
        "next": 498,
        "next_lvl": 70
    },
    "illust_extra": [
        20,
        22,
        56,
        315,
        492
    ],
    "illust_version": 57
};
const mockedShipModel = new ShipModel(exampleShipModelJson);
export {mockedShipModel}

const exampleShipName = {
    "ja_jp": "村雨",
    "ja_kana": "むらさめ",
    "ja_romaji": "murasame",
    "zh_cn": "村雨",
    "en_us": "",
    "suffix": 1
};
const exampleShipNameSuffix = {"ja_jp": "改", "ja_romaji": "Kai", "zh_cn": "改", "id": 1, "_id": "1P6WM4aDPXQUpZP0"};
const mockedShipName = new ShipNameModel(exampleShipName);
export {mockedShipName};