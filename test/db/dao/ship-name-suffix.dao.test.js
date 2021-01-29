import {ShipNameSuffixDao} from "../../../db/dao/ship-name-suffix.dao.js";

test.skip('query db and print one instance', () => {
    return ShipNameSuffixDao.getModelBy(1).then(value => {
        console.log(value);
    });
});