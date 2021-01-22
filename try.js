import config from "config";
import {ConsumaleDao} from "./db/dao/consumale.dao.js";

ConsumaleDao.getOneById(1, {_id: 0}).then(value => {
    console.log(value);
});