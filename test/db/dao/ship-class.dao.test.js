import {ShipClassDao} from "../../../db/dao/ship-class.dao.js";

test.skip('query db and print one model', () => {
    return ShipClassDao.getModelBy(1).then(value => {
        console.log(value);
    });
});