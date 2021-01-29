import {ShipSeasonalCgTypeDao} from "../../../db/dao/ship-seasonal-cg-type.dao.js";

test.skip('query db and print one instance', () => {
    return ShipSeasonalCgTypeDao.getModelBy(1).then(value => {
        console.log(value);
    });
});