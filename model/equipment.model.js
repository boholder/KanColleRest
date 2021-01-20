// TODO unfinished, just for developing ship API using
import {NameModel} from "./name.model.js";

class EquipmentModel {
    constructor({id, name} = {}) {
        this.id = id;
        this.name = new NameModel(name);
    }
}

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

export {EquipmentModel};