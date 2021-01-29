import {ShipSeasonalCgDao} from "../../../db/dao/ship-seasonal-cg.dao.js";

test.skip('query db and print one instance', () => {
    return ShipSeasonalCgDao.getModelBy(1).then(value => {
        console.log(value);
    });
});