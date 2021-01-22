import {ShipClassDao} from "../../db/dao/ship-class.dao.js";

test('handle db query encounter error', () => {
    return ShipClassDao.getModelBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test('query db and print one model', () => {
    return ShipClassDao.getModelBy(2).then(value => {
        console.log(value);
    });
});