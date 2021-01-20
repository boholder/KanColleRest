import {ShipNameModel} from "../../model/name.model";

const exampleShipNameJson = {
    "ja_jp": "村雨",
    "ja_kana": "むらさめ",
    "ja_romaji": "murasame",
    "zh_cn": "村雨",
    "en_us": "",
    "suffix": 1
};
const exampleShipNameSuffixJson = {
    "ja_jp": "改",
    "ja_romaji": "Kai",
    "zh_cn": "改",
    "id": 1,
    "_id": "1P6WM4aDPXQUpZP0"
};
const mockedShipName = new ShipNameModel(exampleShipNameJson);
export {mockedShipName};