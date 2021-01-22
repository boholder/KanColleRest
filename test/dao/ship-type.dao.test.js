import {ShipTypeDao} from "../../db/dao/ship-type.dao.js";

test('handle db query encounter error', () => {
    return ShipTypeDao.getModelBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test.skip('query db and print one model', () => {
    return ShipTypeDao.getModelBy(1).then(value => {
        console.log(value);
    });
});