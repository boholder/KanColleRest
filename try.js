import {ShipNameModel} from "./model/name.model.js";
import {logger} from "./config/winston-logger.js";
import {BaseError, DatabaseQueryExecuteError, ModelBuildError} from "./util/error.js";

const exampleShipName = {
    "ja_jp": "村雨",
    "ja_kana": "むらさめ",
    "ja_romaji": "murasame",
    "zh_cn": "村雨",
    "en_us": "",
    "suffix": 1
};
ShipNameModel.build(exampleShipName).then(
    (result) => {
        console.log(result);
    }
)