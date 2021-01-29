import {ShipTypeDao} from "../../../db/dao/ship-type.dao.js";

test.skip('query db and print one model', () => {
    return ShipTypeDao.getModelBy(1).then(value => {
        console.log(value);
    });
});