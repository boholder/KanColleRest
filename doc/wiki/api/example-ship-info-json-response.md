# Example v1/ship/info json response

request url: **host/v1/ship/info? `match=村雨` & `matchfmt=zh_cn` & `resfmt=json`**

```json
[
  {
    "id": 498,
    "no": 298,
    "name": {
      "ja_jp": "村雨改二",
      "zh_cn": "村雨改二",
      "en_us": "MurasameKai Ni",
      "ja_kana": "むらさめ改二"
    },
    "type": {
      "id": 1,
      "name": {
        "ja_jp": "駆逐艦",
        "zh_cn": "驱逐舰",
        "en_us": "Destroyer"
      }
    },
    "class": {
      "id": 19,
      "name": {
        "ja_jp": "白露",
        "zh_cn": "白露",
        "en_us": "Shiratsuyu"
      }
    },
    "class_no": 3,
    "remodel_series_id": 33,
    "base_level": 70,
    "buildtime": 22,
    "rare": 7,
    "state": {
      "fire": 16,
      "fire_max": 68,
      "torpedo": 28,
      "torpedo_max": 88,
      "anti_air": 18,
      "anti_air_max": 70,
      "anti_submarine": 29,
      "anti_submarine_max": 77,
      "hp": 31,
      "hp_max": 49,
      "armor": 14,
      "armor_max": 51,
      "evasion": 48,
      "evasion_max": 90,
      "carry": 0,
      "speed": 10,
      "range": 1,
      "line_of_sight": 9,
      "line_of_sight_max": 47,
      "luck": 17,
      "luck_max": 77
    },
    "max_consumption": {
      "fuel": 15,
      "ammo": 20
    },
    "equipment_slot": [
      0,
      0,
      0
    ],
    "initial_equipments": [
      {
        "id": 266,
        "name": {
          "ja_jp": "12.7cm連装砲C型改二",
          "zh_cn": "12.7cm连装炮C型改二",
          "en_us": "12.7cm連装砲C型改二"
        },
        "improvement_star": 0
      },
      {
        "id": 15,
        "name": {
          "ja_jp": "61cm四連装(酸素)魚雷",
          "zh_cn": "61cm四连装（酸素）鱼雷",
          "en_us": "61cm四連装(酸素)魚雷"
        },
        "improvement_star": 0
      },
      {
        "id": 40,
        "name": {
          "ja_jp": "25mm三連装機銃",
          "zh_cn": "25mm三连装机枪",
          "en_us": "25mm三連装機銃"
        },
        "improvement_star": 3
      }
    ],
    "dismentlement_gain": {
      "fuel": 1,
      "ammo": 2,
      "steel": 10,
      "bauxite": 0
    },
    "modernization_provides": {
      "fire": 2,
      "torpedo": 2,
      "anti_air": 1,
      "armor": 1,
      "luck": null
    },
    "remodel": {
      "prev": {
        "ship_id": 244,
        "have_more_than_one_prev_form": false
      },
      "next": {
        "ship_id": null,
        "level_request": null,
        "have_more_than_one_next_form": false,
        "cost": {
          "ammo": null,
          "steel": null
        }
      }
    },
    "additinal_item_types": {
      "id": [
        38,
        43
      ],
      "name": {
        "ja_jp": [
          "上陸用舟艇",
          "司令部施設"
        ],
        "en_us": [
          "Landing Craft",
          "Command Facility"
        ],
        "zh_cn": [
          "登陆艇",
          "司令部设施"
        ]
      }
    },
    "additional_disable_item_types": {
      "id": [],
      "name": {
        "ja_jp": [],
        "en_us": [],
        "zh_cn": []
      }
    },
    "special_capabilities": {
      "count_as_landing_craft": false,
      "count_as_night_operation_aviation_personnel": false,
      "participate_night_battle_when_equip_swordfish": false
    },
    "links": [
      {
        "name": "日文WIKI",
        "url": ""
      },
      {
        "name": "英文WIKI",
        "url": ""
      }
    ],
    "relations": {
      "cv": {
        "id": null,
        "name": {
          "ja_jp": "",
          "zh_cn": "",
          "en_us": ""
        }
      },
      "illustrator": {
        "id": null,
        "name": {
          "ja_jp": "",
          "zh_cn": "",
          "en_us": ""
        }
      }
    },
    "cg": {
      "normal": {
        "banner": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n0",
        "banner_masked": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n0-1",
        "banner_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n1",
        "banner_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n1-1",
        "card": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n2",
        "card_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n3",
        "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n8",
        "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n9",
        "head_masked": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n10",
        "head_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=n11"
      },
      "seasonal": [
        {
          "id": 20,
          "type": {
            "id": 6,
            "name": {
              "ja_jp": "梅雨",
              "zh_cn": "梅雨",
              "en_us": "Rainy Season"
            },
            "time": {
              "ja_jp": "6月上旬",
              "en_us": "Early June",
              "zh_cn": "6月初"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=e20",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=d20"
          }
        },
        {
          "id": 56,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=e56",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=d56"
          }
        },
        {
          "id": 317,
          "type": {
            "id": 42,
            "name": {
              "ja_jp": "お出掛け",
              "zh_cn": "外出",
              "en_us": "お出掛け"
            },
            "time": {
              "ja_jp": "",
              "en_us": "",
              "zh_cn": ""
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=e317",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=d317"
          }
        },
        {
          "id": 418,
          "type": {
            "id": 7,
            "name": {
              "ja_jp": "水着",
              "zh_cn": "泳装",
              "en_us": "Swimsuit"
            },
            "time": {
              "ja_jp": "夏",
              "en_us": "Summer",
              "zh_cn": "夏季"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=e418",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=d418"
          }
        },
        {
          "id": 493,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=e493",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=498&cgid=d493"
          }
        }
      ],
      "all_in_one": "http://localhost:3000/v1/ship/cg?shipid=undefined&cgid=a"
    }
  },
  {
    "id": 244,
    "no": 1344,
    "name": {
      "ja_jp": "村雨改",
      "zh_cn": "村雨改",
      "en_us": "MurasameKai",
      "ja_kana": "むらさめ改"
    },
    "type": {
      "id": 1,
      "name": {
        "ja_jp": "駆逐艦",
        "zh_cn": "驱逐舰",
        "en_us": "Destroyer"
      }
    },
    "class": {
      "id": 19,
      "name": {
        "ja_jp": "白露",
        "zh_cn": "白露",
        "en_us": "Shiratsuyu"
      }
    },
    "class_no": 3,
    "remodel_series_id": 33,
    "base_level": 20,
    "buildtime": 22,
    "rare": 4,
    "state": {
      "fire": 12,
      "fire_max": 49,
      "torpedo": 28,
      "torpedo_max": 79,
      "anti_air": 15,
      "anti_air_max": 49,
      "anti_submarine": 24,
      "anti_submarine_max": 59,
      "hp": 30,
      "hp_max": 48,
      "armor": 14,
      "armor_max": 49,
      "evasion": 45,
      "evasion_max": 89,
      "carry": 0,
      "speed": 10,
      "range": 1,
      "line_of_sight": 7,
      "line_of_sight_max": 39,
      "luck": 12,
      "luck_max": 59
    },
    "max_consumption": {
      "fuel": 15,
      "ammo": 20
    },
    "equipment_slot": [
      0,
      0,
      0
    ],
    "initial_equipments": [
      {
        "id": 2,
        "name": {
          "ja_jp": "12.7cm連装砲",
          "zh_cn": "12.7cm连装炮",
          "en_us": "12.7cm連装砲"
        },
        "improvement_star": 0
      },
      {
        "id": 15,
        "name": {
          "ja_jp": "61cm四連装(酸素)魚雷",
          "zh_cn": "61cm四连装（酸素）鱼雷",
          "en_us": "61cm四連装(酸素)魚雷"
        },
        "improvement_star": 0
      },
      null
    ],
    "dismentlement_gain": {
      "fuel": 1,
      "ammo": 2,
      "steel": 10,
      "bauxite": 0
    },
    "modernization_provides": {
      "fire": 1,
      "torpedo": 1,
      "anti_air": 1,
      "armor": 1,
      "luck": null
    },
    "remodel": {
      "prev": {
        "ship_id": 44,
        "have_more_than_one_prev_form": false
      },
      "next": {
        "ship_id": 498,
        "level_request": 70,
        "have_more_than_one_next_form": false,
        "cost": {
          "ammo": 200,
          "steel": 180
        }
      }
    },
    "additinal_item_types": {
      "id": [],
      "name": {
        "ja_jp": [],
        "en_us": [],
        "zh_cn": []
      }
    },
    "additional_disable_item_types": {
      "id": [],
      "name": {
        "ja_jp": [],
        "en_us": [],
        "zh_cn": []
      }
    },
    "special_capabilities": {
      "count_as_landing_craft": false,
      "count_as_night_operation_aviation_personnel": false,
      "participate_night_battle_when_equip_swordfish": false
    },
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
    "relations": {
      "cv": {
        "id": 15,
        "name": {
          "ja_jp": "谷邊 由美",
          "zh_cn": "谷边 由美",
          "en_us": "谷邊 由美"
        }
      },
      "illustrator": {
        "id": 35,
        "name": {
          "ja_jp": "玖条イチソ",
          "zh_cn": "玖条ITISO",
          "en_us": "玖条イチソ"
        }
      }
    },
    "cg": {
      "normal": {
        "banner": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n0",
        "banner_masked": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n0-1",
        "banner_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n1",
        "banner_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n1-1",
        "card": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n2",
        "card_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n3",
        "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n8",
        "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n9",
        "head_masked": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n10",
        "head_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=n11"
      },
      "seasonal": [
        {
          "id": 20,
          "type": {
            "id": 6,
            "name": {
              "ja_jp": "梅雨",
              "zh_cn": "梅雨",
              "en_us": "Rainy Season"
            },
            "time": {
              "ja_jp": "6月上旬",
              "en_us": "Early June",
              "zh_cn": "6月初"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=e20",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=d20"
          }
        },
        {
          "id": 22,
          "type": {
            "id": 7,
            "name": {
              "ja_jp": "水着",
              "zh_cn": "泳装",
              "en_us": "Swimsuit"
            },
            "time": {
              "ja_jp": "夏",
              "en_us": "Summer",
              "zh_cn": "夏季"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=e22",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=d22"
          }
        },
        {
          "id": 56,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=e56",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=d56"
          }
        },
        {
          "id": 315,
          "type": {
            "id": 42,
            "name": {
              "ja_jp": "お出掛け",
              "zh_cn": "外出",
              "en_us": "お出掛け"
            },
            "time": {
              "ja_jp": "",
              "en_us": "",
              "zh_cn": ""
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=e315",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=d315"
          }
        },
        {
          "id": 492,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=e492",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=244&cgid=d492"
          }
        }
      ],
      "all_in_one": "http://localhost:3000/v1/ship/cg?shipid=undefined&cgid=a"
    }
  },
  {
    "id": 44,
    "no": 81,
    "name": {
      "ja_jp": "村雨",
      "zh_cn": "村雨",
      "en_us": "Murasame",
      "ja_kana": "むらさめ"
    },
    "type": {
      "id": 1,
      "name": {
        "ja_jp": "駆逐艦",
        "zh_cn": "驱逐舰",
        "en_us": "Destroyer"
      }
    },
    "class": {
      "id": 19,
      "name": {
        "ja_jp": "白露",
        "zh_cn": "白露",
        "en_us": "Shiratsuyu"
      }
    },
    "class_no": 3,
    "remodel_series_id": 33,
    "base_level": 1,
    "buildtime": 22,
    "rare": 2,
    "state": {
      "fire": 10,
      "fire_max": 29,
      "torpedo": 24,
      "torpedo_max": 69,
      "anti_air": 9,
      "anti_air_max": 39,
      "anti_submarine": 21,
      "anti_submarine_max": 49,
      "hp": 16,
      "hp_max": 32,
      "armor": 6,
      "armor_max": 19,
      "evasion": 43,
      "evasion_max": 79,
      "carry": 0,
      "speed": 10,
      "range": 1,
      "line_of_sight": 5,
      "line_of_sight_max": 19,
      "luck": 10,
      "luck_max": 49
    },
    "max_consumption": {
      "fuel": 15,
      "ammo": 20
    },
    "equipment_slot": [
      0,
      0
    ],
    "initial_equipments": [
      {
        "id": 2,
        "name": {
          "ja_jp": "12.7cm連装砲",
          "zh_cn": "12.7cm连装炮",
          "en_us": "12.7cm連装砲"
        },
        "improvement_star": 0
      },
      null
    ],
    "dismentlement_gain": {
      "fuel": 1,
      "ammo": 1,
      "steel": 5,
      "bauxite": 0
    },
    "modernization_provides": {
      "fire": 0,
      "torpedo": 1,
      "anti_air": 0,
      "armor": 0,
      "luck": null
    },
    "remodel": {
      "prev": {
        "ship_id": null,
        "have_more_than_one_prev_form": false
      },
      "next": {
        "ship_id": 244,
        "level_request": 20,
        "have_more_than_one_next_form": false,
        "cost": {
          "ammo": 100,
          "steel": 100
        }
      }
    },
    "additinal_item_types": {
      "id": [],
      "name": {
        "ja_jp": [],
        "en_us": [],
        "zh_cn": []
      }
    },
    "additional_disable_item_types": {
      "id": [],
      "name": {
        "ja_jp": [],
        "en_us": [],
        "zh_cn": []
      }
    },
    "special_capabilities": {
      "count_as_landing_craft": false,
      "count_as_night_operation_aviation_personnel": false,
      "participate_night_battle_when_equip_swordfish": false
    },
    "links": [
      {
        "name": "日文WIKI",
        "url": "http://wikiwiki.jp/kancolle/?%C2%BC%B1%AB"
      },
      {
        "name": "英文WIKI",
        "url": "http://kancolle.wikia.com/wiki/Murasame"
      }
    ],
    "relations": {
      "cv": {
        "id": 15,
        "name": {
          "ja_jp": "谷邊 由美",
          "zh_cn": "谷边 由美",
          "en_us": "谷邊 由美"
        }
      },
      "illustrator": {
        "id": 35,
        "name": {
          "ja_jp": "玖条イチソ",
          "zh_cn": "玖条ITISO",
          "en_us": "玖条イチソ"
        }
      }
    },
    "cg": {
      "normal": {
        "banner": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n0",
        "banner_masked": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n0-1",
        "banner_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n1",
        "banner_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n1-1",
        "card": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n2",
        "card_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n3",
        "whole_body": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n8",
        "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n9",
        "head_masked": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n10",
        "head_dmged_masked": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=n11"
      },
      "seasonal": [
        {
          "id": 56,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=e56",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=d56"
          }
        },
        {
          "id": 315,
          "type": {
            "id": 42,
            "name": {
              "ja_jp": "お出掛け",
              "zh_cn": "外出",
              "en_us": "お出掛け"
            },
            "time": {
              "ja_jp": "",
              "en_us": "",
              "zh_cn": ""
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=e315",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=d315"
          }
        },
        {
          "id": 492,
          "type": {
            "id": 31,
            "name": {
              "ja_jp": "F作業(釣りアゲ)",
              "zh_cn": "F作业（钓鱼）",
              "en_us": "F Operation"
            },
            "time": {
              "ja_jp": "10月中旬",
              "en_us": "Mid October",
              "zh_cn": "10月中"
            }
          },
          "url": {
            "whole_body": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=e492",
            "whole_body_dmged": "http://localhost:3000/v1/ship/cg?shipid=44&cgid=d492"
          }
        }
      ],
      "all_in_one": "http://localhost:3000/v1/ship/cg?shipid=undefined&cgid=a"
    }
  }
]
```