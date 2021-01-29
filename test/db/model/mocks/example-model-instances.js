import {DismantlementGainModel} from "../../../../db/model/dismantlement-gain.model.js";
import {CreatorModel} from "../../../../db/model/creator.model.js";
import {EquipmentTypeModel} from "../../../../db/model/equipment-type.model.js";
import {LinkModel} from "../../../../db/model/link.model.js";
import {ShipTypeModel} from "../../../../db/model/ship/ship-type.model.js";
import {FieldEntityArray, SimplifiedFieldEntityModel} from "../../../../db/model/simplified-field-entity.model.js";
import {ShipClassModel} from "../../../../db/model/ship/ship-class.model.js";
import {ShipModel} from "../../../../db/model/ship.model.js";
import {ShipStateModel} from "../../../../db/model/ship/ship-state.model.js";
import {ShipModernizationModel} from "../../../../db/model/ship/ship-modernization.model.js";
import {RemodelModel} from "../../../../db/model/ship/ship-remodel.model.js";
import {CreatorsModel} from "../../../../db/model/ship/ship-creators.model.js";
import {CapabilitiesModel} from "../../../../db/model/ship/ship-capabilities.model.js";
import {ShipNameModel} from "../../../../db/model/ship/ship-name.model.js";
import {ShipMainTypeModel} from "../../../../db/model/ship/ship-main-type.model.js";
import {ShipSeasonalCgTypeModel} from "../../../../db/model/ship/ship-seasonal-cg-type.model.js";
import {EquipmentModel} from "../../../../db/model/equipment.model";

const exampleDismantlingGainArray = [1, 2, 10, 0];
const exampleDismantlingGain = DismantlementGainModel.build(exampleDismantlingGainArray);
export {exampleDismantlingGain};

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
const exampleCreator = CreatorModel.build(exampleCreatorJson);
export {exampleCreator};

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
const exampleEquipType = EquipmentTypeModel.build(exampleEquipTypeJson)
export {exampleEquipType, exampleEquipTypeJson};

const exampleLinkArrayJson = [{
    "name": "Wikipedia",
    "url": "https://ja.wikipedia.org/wiki/%E8%8C%85%E9%87%8E%E6%84%9B%E8%A1%A3"
}]
const exampleLinkArray = LinkModel.buildLinkArray(exampleLinkArrayJson);
export {exampleLinkArray};

const exampleShipTypeJson = {
    "id": 1,
    "code": "DD",
    "code_game": "駆逐",
    "_id": "NkAIZy0T53JXtl5i",
    "equipable": [1, 2, 3, 12, 24, 26, 27, 29, 30, 31, 32, 35, 37, 39, 40, 41, 44, 48],
    "name": {"en_us": "Destroyer", "ja_jp": "駆逐艦", "zh_cn": "驱逐舰"},
    "tp": 5
}
const exampleShipType = ShipTypeModel.build(exampleShipTypeJson);
const exampleMainShipTypeJson = {
    "name": {"zh_cn": "驱逐舰", "en_us": "Destroyers", "ja_jp": "駆逐艦"},
    "types": [[1, 19]],
    "id": 4,
    "_id": "STrlqZfKVFD8K7Vw"
}
const exampleMainShipType = ShipMainTypeModel.build(exampleMainShipTypeJson);
export {exampleMainShipType};
export {exampleShipType};

const mockSimplifiedFieldEntity = SimplifiedFieldEntityModel.build(exampleEquipTypeJson);
const exampleFieldEntityArray = FieldEntityArray.buildModelFromEntityArray([mockSimplifiedFieldEntity]);
export {exampleFieldEntityArray};

const exampleShipClassJson = {
    "ship_type_id": 1,
    "id": 19,
    "_id": "D8Fb8K8IZYvwA4nk",
    "speed_rule": "high-3",
    "name": {"en_us": "Shiratsuyu", "ja_jp": "白露", "zh_cn": "白露"}
};
const exampleShipClass = ShipClassModel.build(exampleShipClassJson)
export {exampleShipClass};

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
const exampleShipState = ShipStateModel.build(exampleShipStateJson);
export {exampleShipState};

const exampleModernizationGainArray = [2, 2, 1, 1];
const exampleModernizationGain = ShipModernizationModel.build(exampleModernizationGainArray);
export {exampleModernizationGain};

const exampleRemodelJson = {
    "prev": 44,
    "next": 498,
    "next_lvl": 70
};
const exampleRemodelCostJson = {
    "ammo": 180,
    "steel": 120
}
const exampleRemodel = RemodelModel.build(exampleRemodelJson, exampleRemodelCostJson);
export {exampleRemodel};

const exampleCreatorsJson = {
    "cv": 15,
    "illustrator": 35
};
const exampleCreators = CreatorsModel.build(exampleCreatorsJson);
export {exampleCreators};
const exampleCapabilitiesJson = {
    "count_as_night_operation_aviation_personnel": 1
};
const exampleCapabilities = CapabilitiesModel.build(exampleCreatorsJson);
export {exampleCapabilities};
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
        {id: 15, star: 3}
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
const exampleShipModel = ShipModel.build(exampleShipModelJson);
export {exampleShipModel, exampleShipModelJson}

const exampleShipNameJson = {
    "ja_jp": "村雨",
    "ja_kana": "むらさめ",
    "ja_romaji": "murasame",
    "zh_cn": "村雨",
    "en_us": "",
    "suffix": 1
};
const exampleShipNameSuffix = {"ja_jp": "改", "ja_romaji": "Kai", "zh_cn": "改", "id": 1, "_id": "1P6WM4aDPXQUpZP0"};
const exampleShipName = ShipNameModel.build(exampleShipNameJson);
export {exampleShipName};
const exampleShipSeasonalCgTypeJson = {
    "time": {"en_us": "Winter", "zh_cn": "冬季", "ja_jp": "冬"},
    "name": {"ja_jp": "麦酒乾杯", "en_us": "麦酒乾杯", "zh_cn": "麦酒干杯"},
    "id": 49,
    "sort": 34,
    "_id": "07G035Akpqwr2i3k"
};
const exampleShipSeasonalCgType = ShipSeasonalCgTypeModel.build(exampleShipSeasonalCgTypeJson);
export {exampleShipSeasonalCgType};
const exampleEquipmentJson = {
    "id": 2,
    "rarity": 0,
    "type": 1,
    "name": {
        "ja_jp": "12.7cm連装砲",
        "ja_kana": "",
        "ja_romaji": "",
        "zh_cn": "12.7cm连装炮",
        "en_us": ""
    },
    "stat": {
        "fire": 2,
        "torpedo": 0,
        "bomb": 0,
        "asw": 0,
        "aa": 2,
        "armor": 0,
        "evasion": 0,
        "hit": 0,
        "los": 0,
        "range": 1
    },
    "dismantle": [
        0,
        1,
        2,
        0
    ],
    "time_created": 1427783683384,
    "_id": "Bin4660LIpFyLkBq",
    "craftable": false,
    "improvable": true,
    "upgrade_to": [
        [
            63,
            0
        ]
    ],
    "time_modified": 1608409914072,
    "improvement": [
        {
            "upgrade": [
                63,
                0
            ],
            "req": [
                [
                    [
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true
                    ],
                    false
                ]
            ],
            "resource": [
                [
                    10,
                    30,
                    60,
                    0
                ],
                [
                    1,
                    2,
                    1,
                    2,
                    [
                        [
                            null,
                            0
                        ]
                    ]
                ],
                [
                    1,
                    2,
                    1,
                    2,
                    [
                        [
                            2,
                            1
                        ]
                    ]
                ],
                [
                    2,
                    3,
                    3,
                    6,
                    [
                        [
                            2,
                            2
                        ]
                    ]
                ]
            ]
        }
    ],
    "type_ingame": [
        1,
        1,
        1,
        1,
        0
    ],
    "upgrade_for": [
        63,
        282,
        229,
        280,
        78,
        266,
        297,
        147
    ],
    "default_equipped_on": [
        13,
        14,
        93,
        15,
        94,
        16,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        244,
        45,
        245,
        405,
        46,
        47,
        95,
        96,
        97,
        98,
        413,
        414,
        48,
        49,
        17,
        18,
        19,
        190,
        20,
        181,
        186,
        168,
        167,
        170,
        415,
        169,
        122,
        132,
        133,
        134,
        135,
        425,
        409,
        410,
        50,
        104,
        105,
        424,
        453,
        458,
        459,
        454,
        455,
        452,
        456,
        457,
        485,
        479,
        480,
        484,
        527,
        583,
        528,
        625,
        632
    ],
    "illust_version": 2
};
const exampleEquipment = EquipmentModel.build(exampleEquipmentJson);
export {exampleEquipment};